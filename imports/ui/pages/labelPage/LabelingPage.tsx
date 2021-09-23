import React, { useEffect, useRef, useState } from 'react';

import ImageFilesPage from './ImageFilesPage/ImageFilesPage';
import ObjectPage from './ObjectPage/ObjectPage';
import HeaderPage from './HeaderPage/HeaderPage';

import styles from './LabelingPage.module.css';
import Editor, { EditorMode } from './Editor';
import TmpBar from './TmpBar';
import { useSetRecoilState } from 'recoil';
import {
  AnnotationDispatcher,
  annotationDispatcherState,
  createAnnotationDispatcher,
} from '../../../recoil/annotation';

import queryString from 'query-string';
import { useTracker } from 'meteor/react-meteor-data';
import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';

import { projectCollection } from 'imports/db/collections';

export default function LabelingPage() {
  const query = queryString.parse(location.search);
  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const gtinfor = useTracker(() => imageInfoCollection.find({}).fetch());
  const imageList = useTracker(() => imageInfoCollection.find({}).fetch());

  const [currentProjectInfo, setCurrentProjectInfo] = useState(null);
  const [currentImagesInfo, setCurrentImagesInfo] = useState(null);
  const [currentImageInfo, setCurrentImageInfo] = useState(null);
  const [currentGtInfo, setCurrentGtInfo] = useState(null);

  useEffect(() => {
    if (projectList.length !== 0) {
      let currentProjectInfortmp;
      currentProjectInfortmp = projectList.find((e) => e.projectName === query.projectName);
      if (currentProjectInfo === null) setCurrentProjectInfo(currentProjectInfortmp);
    }
  }, [projectList]);

  useEffect(() => {
    if (currentProjectInfo !== null) {
      let currentImagesInfoTmp;
      currentImagesInfoTmp = imageList.filter((e) => e.projectName === query.projectName);
      if (currentImagesInfo === null) setCurrentImagesInfo(currentImagesInfoTmp);

      let currentGtInfoTmp;
      currentGtInfoTmp = gtinfor.filter((e) => e.projectName === query.projectName);
      if (currentGtInfo === null) setCurrentGtInfo(currentImagesInfoTmp);
    }
  }, [currentProjectInfo]);

  // ----------------------------------------------------------------
  // TODO: DB에서 이미지 꺼내와야 함
  const [image, setImage] = useState<HTMLImageElement>(undefined);
  useEffect(() => {
    const img = new Image();
    img.src = '/poster.jpg';
    img.onload = () => {
      setImage(img);
    };
  }, []);

  // TODO: 우측? 상단? 에서 Rect, Polygon 버튼 누르면 변경되면 됨
  const [mode, setMode] = useState<EditorMode>(EditorMode.Idle);

  // Annotation Dispatcher 초기화
  const setAnnotationDispatcher = useSetRecoilState(annotationDispatcherState);
  const dispatcherRef = useRef<AnnotationDispatcher>(createAnnotationDispatcher());
  useEffect(() => {
    setAnnotationDispatcher(dispatcherRef.current);
  }, []);
  // ----------------------------------------------------------------

  return (
    <div className={styles.main}>
      <HeaderPage />
      <div className={styles.contents}>
        <ImageFilesPage
          currentImagesInfo={currentImagesInfo}
          setCurrentImageInfo={setCurrentImageInfo}
        />
        {/* 라벨링 작업하는 중앙 캔버스 */}
        <Editor image={image} mode={mode} />
        {/* 임시로 데이터 확인하려고 넣은 우측바 */}
        {/* <TmpBar mode={mode} onModeChange={setMode} /> */}
        <ObjectPage currentProjectInfo={currentProjectInfo} currentImageInfo={currentImageInfo} />
      </div>
    </div>
  );
}
