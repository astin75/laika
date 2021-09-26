import { gtInfoCollection, imageInfoCollection, projectCollection } from 'imports/db/collections';
import Images from 'imports/db/files';
import _ from 'lodash';
import { useTracker } from 'meteor/react-meteor-data';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  getBoundingPointsOfRegion,
  IKeypoint,
  RegionDataType,
} from '../../../canvasTools/IRegionData';
import {
  AnnotationDispatcher,
  annotationDispatcherState,
  createAnnotationDispatcher,
  currentAnnotations,
  selectionIdx,
} from '../../../recoil/annotation';
import Editor, { EditorMode } from './Editor';
import HeaderPage from './HeaderPage/HeaderPage';
import ImageFilesPage from './ImageFilesPage/ImageFilesPage';
import styles from './LabelingPage.module.css';
import ObjectPage from './ObjectPage/ObjectPage';

export default function LabelingPage() {
  const query = queryString.parse(location.search);
  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const gtinfor = useTracker(() =>
    imageInfoCollection.find({ projectName: query.projectName }).fetch()
  );
  const imageList = useTracker(() =>
    imageInfoCollection.find({ projectName: query.projectName }).fetch()
  );

  const [currentProjectInfo, setCurrentProjectInfo] = useState(null);
  const [currentImagesInfo, setCurrentImagesInfo] = useState(null);
  const [currentImageInfo, setCurrentImageInfo] = useState(null);
  const [currentGtInfo, setCurrentGtInfo] = useState(null);
  const prevImageInfo = useRef(undefined);

  useEffect(() => {
    if (projectList.length !== 0) {
      let currentProjectInfortmp;
      currentProjectInfortmp = projectList.find((e) => e.projectName === query.projectName);
      if (currentProjectInfo === null) setCurrentProjectInfo(currentProjectInfortmp);
    }
  }, [projectList]);

  // useEffect(() => {
  //   if (currentProjectInfo !== null) {
  //     let currentImagesInfoTmp;
  //     currentImagesInfoTmp = imageList.filter((e) => e.projectName === query.projectName);
  //     if (currentImagesInfo === null) setCurrentImagesInfo(currentImagesInfoTmp);
  //
  //     // 임의로 세팅
  //     let currentGtInfoTmp;
  //     currentGtInfoTmp = gtinfor.filter((e) => e.projectName === query.projectName);
  //     if (currentGtInfo === null) setCurrentGtInfo(currentImagesInfoTmp);
  //   }
  // }, [currentProjectInfo]);

  // 이미지 로드
  const [image, setImage] = useState<HTMLImageElement>(undefined);
  useEffect(() => {
    if (currentImageInfo) {
      // DB 로드
      const prevData = gtInfoCollection.findOne({
        ImgFileId: currentImageInfo.fileId,
      })?.annotations;

      const img = new Image();
      img.src = Images.findOne({ 'meta.fileId': currentImageInfo.fileId }).link();
      imageInfoCollection.update(
        { _id: currentImageInfo._id },
        { $set: { confirmFlag: 'working' } }
      );
      img.onload = () => {
        setImage(img);
        if (prevData) {
          annotationDispatcher?.initFromData(prevData);
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
        toSave.annotations = annotations;
        annotationDispatcher?.reset();
        gtInfoCollection.update({ _id: toSave._id }, { $set: toSave });
        prevImageInfo.current = currentImageInfo;
      }
    }
  }, [currentImageInfo]);

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
    if (e.ctrlKey) {
      switch (e.key) {
        case '1':
          setMode(EditorMode.Idle);
          break;
        case '2':
          setMode(EditorMode.Rect);
          break;
        case '3':
          setMode(EditorMode.Skeleton);
          break;
        case '4':
          setMode(EditorMode.Polygon);
          break;
        default:
          break;
      }
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
    //새로운 오브젝트
    if (e.key === 'n') {
      if (!currentImageInfo) {
        alert('이미지를 먼저 클릭해주세요');
        return;
      }
      annotationDispatcher?.insert(currentProjectInfo.keypoint.length > 0, currentProjectInfo);

      let idx = annotations.length + 1;

      // annotationDispatcher?.setSelectionAnnotation(selection, false);
      // annotationDispatcher?.setSelectionAnnotation(idx, true);
      // setSelection(idx);
      // if (annotations[idx].regions.rect) annotationDispatcher?.highlightRect(idx, undefined);
      // setSelectedObject(idx);
      // canvasViewDispatcher?.refreshCanvas();
      // setCurKeypoint(0);
    }

    // 라벨링 지우기
    if (e.key === 'Delete') {
      if (selection !== undefined) {
        const newAnnot = _.cloneDeep(annotations[selection]);
        if (mode === EditorMode.Rect) newAnnot.regions.rect = undefined;
        if (mode === EditorMode.Polygon) newAnnot.regions.polygon = undefined;
        if (mode === EditorMode.Skeleton) {
          const defaultPoints: IKeypoint[] = currentProjectInfo.keypoint.map((name) => {
            return {
              visible: 0,
              alias: name,
              x: 0,
              y: 0,
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
            selected: false,
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
        <ObjectPage
          currentProjectInfo={currentProjectInfo}
          currentImageInfo={currentImageInfo}
          mode={mode}
          setMode={setMode}
        />
      </div>
    </div>
  );
}
