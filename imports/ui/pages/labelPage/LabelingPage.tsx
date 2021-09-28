import React, { useEffect, useRef, useState } from 'react';

import ImageFilesPage from './ImageFilesPage/ImageFilesPage';
import ObjectPage from './ObjectPage/ObjectPage';
import HeaderPage from './HeaderPage/HeaderPage';

import styles from './LabelingPage.module.css';
import Editor, { EditorMode } from './Editor';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  AnnotationDispatcher,
  annotationDispatcherState,
  createAnnotationDispatcher,
  currentAnnotations, ISaveAnnotation,
  selectionIdx
} from '../../../recoil/annotation';
import _ from 'lodash';

import Images from 'imports/db/files';
import queryString from 'query-string';
import { useTracker } from 'meteor/react-meteor-data';
import { gtInfoCollection, imageInfoCollection, projectCollection } from 'imports/db/collections';
import { getBoundingPointsOfRegion, IKeypoint, RegionDataType } from '../../../canvasTools/IRegionData';

export default function LabelingPage() {
  const projectList = useTracker(() => projectCollection.find({}).fetch(), []);
  const imageList = useTracker(() => {
    const query = queryString.parse(location.search);
    const projectName = query.projectName;
    return imageInfoCollection.find({ projectName }).fetch();
  }, []);

  const [currentProjectInfo, setCurrentProjectInfo] = useState(null);
  const [currentImageInfo, setCurrentImageInfo] = useState(null);
  const prevImageInfo = useRef(undefined);

  useEffect(() => {
    if (projectList.length !== 0) {
      const query = queryString.parse(location.search);
      let currentProjectInfortmp;
      currentProjectInfortmp = projectList.find((e) => e.projectName === query.projectName);
      setCurrentProjectInfo(currentProjectInfortmp);
    }
  }, [projectList]);

  // 이미지 로드
  const [image, setImage] = useState<HTMLImageElement>(undefined);
  useEffect(() => {
    if (currentImageInfo) {
      // DB 로드
      const prevData = gtInfoCollection.findOne({ ImgFileId: currentImageInfo.fileId })?.annotations;

      const img = new Image();
      img.src = Images.findOne({ 'meta.fileId': currentImageInfo.fileId }).link();
      imageInfoCollection.update({ _id: currentImageInfo._id }, { $set: { confirmFlag: 'working' } });
      img.onload = () => {
        setImage(img);
        if (prevData) {
          annotationDispatcher?.initFromData(prevData, currentProjectInfo);
        }
      };
    }
  }, [currentImageInfo]);

  // DB 저장
  useEffect(() => {
    // first image
    if (currentImageInfo) {
      if (!prevImageInfo.current) {
        prevImageInfo.current = currentImageInfo;
      } else {
        const toSave = gtInfoCollection.findOne({ ImgFileId: prevImageInfo.current.fileId });
        toSave.annotations = getSaveAnnotationsFormat();
        annotationDispatcher?.reset();
        gtInfoCollection.update({ _id: toSave._id }, { $set: toSave });
        prevImageInfo.current = currentImageInfo;
      }
    }
  }, [currentImageInfo]);

  const getSaveAnnotationsFormat = () => {
    const saveFormat: ISaveAnnotation[] = annotations.map((annot) => {
      let box: boolean | number[] = false;
      let keypoints: boolean | number[][] = false;
      let polygon: boolean | number[][] = false;
      let boundingPoints: boolean | number[][] = false;
      let state1: boolean | string = false;
      let state2: boolean | string = false;
      let id: boolean | number = false;
      if (annot.regions.rect) {
        box = [annot.regions.rect.x, annot.regions.rect.y, annot.regions.rect.width, annot.regions.rect.height];
      }
      if (annot.regions.keypoint) {
        keypoints = annot.regions.keypoint.points.map((pt) => [pt.x, pt.y, pt.visible]);
      }
      if (annot.regions.polygon) {
        polygon = annot.regions.polygon.points.map((pt) => [pt.x, pt.y]);
        boundingPoints = annot.regions.polygon.boundingPoints.map((pt) => [pt.x, pt.y]);
      }
      if (currentProjectInfo.stateList[0]) {
        const state = currentProjectInfo.stateList[0].stateName;
        if (annot.meta[state])
          state1 = annot.meta[state];
      }
      if (currentProjectInfo.stateList[1]) {
        const state = currentProjectInfo.stateList[1].stateName;
        if (annot.meta[state])
          state2 = annot.meta[state];
      }
      if (annot.meta['trackingId'] !== undefined) {
        id = annot.meta['trackingId'];
      }
      return {
        className: annot.className,
        box, keypoints, polygon, boundingPoints, state1, state2, id
      };
    });
    return saveFormat;
  };

  // ----------------------------------------------------------------

  const [mode, setMode] = useState<EditorMode>(EditorMode.Idle);

  // Annotation Dispatcher 초기화
  const setAnnotationDispatcher = useSetRecoilState(annotationDispatcherState);
  const dispatcherRef = useRef<AnnotationDispatcher>(createAnnotationDispatcher());
  useEffect(() => {
    setAnnotationDispatcher(dispatcherRef.current);
  }, []);
  const annotations = useRecoilValue(currentAnnotations);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const [selection, setSelection] = useRecoilState(selectionIdx); // 선택된 어노테이션 인덱스 저장

  // ----------------------------------------------------------------
  const keyDownHandler = (e) => {
    // 모드 선택
    switch (e.key) {
      case 'q':
        setMode(EditorMode.Idle);
        break;
      case 'w':
        if (currentProjectInfo.bbox.length)
          setMode(EditorMode.Rect);
        break;
      case 'e':
        if (currentProjectInfo.keypoint.length)
          setMode(EditorMode.Skeleton);
        break;
      case 'r':
        if (currentProjectInfo.polygon)
          setMode(EditorMode.Polygon);
        break;
      default:
        break;
    }
    // 파일 넘기기
    if (e.key === 'a') {
      let curIdx = imageList.findIndex((e) => e._id === currentImageInfo._id);
      if (curIdx > 0) {
        curIdx -= 1;
        setCurrentImageInfo(imageList[curIdx]);
      }
    }
    if (e.key === 'd') {
      let curIdx = imageList.findIndex((e) => e._id === currentImageInfo._id);
      if (curIdx < imageList.length - 1) {
        curIdx += 1;
        setCurrentImageInfo(imageList[curIdx]);
      }
    }
    // 라벨링 지우기
    if (e.key === 'Delete') {
      if (selection !== undefined) {
        const newAnnot = _.cloneDeep(annotations[selection]);
        if (mode === EditorMode.Rect)
          newAnnot.regions.rect = undefined;
        if (mode === EditorMode.Polygon)
          newAnnot.regions.polygon = undefined;
        if (mode === EditorMode.Skeleton) {
          const defaultPoints: IKeypoint[] = currentProjectInfo.keypoint.map((name) => {
            return {
              visible: 0,
              alias: name,
              x: 0,
              y: 0
            };
          });
          newAnnot.regions.keypoint = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            boundingPoints: getBoundingPointsOfRegion(0, 0, 0, 0),
            points: defaultPoints,
            area: 0,
            type: RegionDataType.Skeleton,
            visible: true,
            highlighted: false,
            selected: false
          };
        }
        annotationDispatcher?.edit(selection, newAnnot, false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });

  return (
    <div className={styles.main}>
      <HeaderPage currentProjectInfo={currentProjectInfo} />
      <div className={styles.contents}>
        {/* 현재 프로젝트에서 업로드한 이미지 페이지 */}
        <ImageFilesPage
          currentImagesInfo={imageList}
          currentImageInfo={currentImageInfo}
          setCurrentImageInfo={setCurrentImageInfo}
        />
        {/* 라벨링 작업하는 중앙 캔버스 */}
        <Editor image={image} mode={mode} setMode={setMode} projectInfo={currentProjectInfo} />
        {/* 클릭한 이미지에 대한 Object 페이지 */}
        <ObjectPage currentProjectInfo={currentProjectInfo} currentImageInfo={currentImageInfo} mode={mode}
                    setMode={setMode} />
      </div>
    </div>
  );
}
