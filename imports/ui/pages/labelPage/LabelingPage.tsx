import React, { useEffect, useRef, useState } from 'react';

import ImageFilesPage from './ImageFilesPage/ImageFilesPage';
import ObjectPage from './ObjectPage/ObjectPage';
import HeaderPage from './HeaderPage/HeaderPage';

import styles from './LabelingPage.module.css';
import Editor, { EditorMode } from './Editor';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  AnnotationDispatcher,
  annotationDispatcherState,
  createAnnotationDispatcher,
  currentAnnotations
} from '../../../recoil/annotation';

import Images from 'imports/db/files';
import queryString from 'query-string';
import { useTracker } from 'meteor/react-meteor-data';
import { gtInfoCollection, imageInfoCollection, projectCollection } from 'imports/db/collections';

export default function LabelingPage() {
  const query = queryString.parse(location.search);
  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const gtinfor = useTracker(() => imageInfoCollection.find({}).fetch());
  const imageList = useTracker(() => imageInfoCollection.find({}).fetch());

  const [currentProjectInfo, setCurrentProjectInfo] = useState(null);
  // const [currentImagesInfo, setCurrentImagesInfo] = useState(null);
  const [currentImageInfo, setCurrentImageInfo] = useState(null);
  // const [currentGtInfo, setCurrentGtInfo] = useState(null);
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
      const prevData = gtInfoCollection.findOne({ ImgFileId: currentImageInfo.fileId })?.annotations;

      const img = new Image();
      img.src = Images.findOne({ 'meta.fileId': currentImageInfo.fileId }).link();
      imageInfoCollection.update({ _id: currentImageInfo._id }, { $set: { confirmFlag: 'working' } });
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
