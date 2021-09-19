import React, {useEffect, useRef, useState} from 'react';

import ImageFilesPage from './ImageFilesPage/ImageFilesPage';
import ObjectPage from './ObjectPage/ObjectPage';
import HeaderPage from './HeaderPage/HeaderPage';

import styles from './LabelingPage.module.css';
import Editor, {EditorMode} from './Editor';
import TmpBar from './TmpBar';
import {useSetRecoilState} from 'recoil';
import {
  AnnotationDispatcher,
  annotationDispatcherState,
  createAnnotationDispatcher
} from '../../../../recoil/annotation';

export default function LabelingPage() {
  // TODO: DB에서 이미지 꺼내와야 함
  const [image, setImage] = useState<HTMLImageElement>(undefined);
  useEffect(() => {
    const img = new Image();
    img.src = '/poster.jpg';
    img.onload = () => {
      setImage(img);
    };
  }, []);

  // TODO: 옵션 바에서 모드 셀렉트 연결 해야 함
  const [mode, setMode] = useState<EditorMode>(EditorMode.Idle);

  // Annotation Dispatcher
  const setAnnotationDispatcher = useSetRecoilState(annotationDispatcherState);
  const dispatcherRef = useRef<AnnotationDispatcher>(
    createAnnotationDispatcher(),
  );
  useEffect(() => {
    setAnnotationDispatcher(dispatcherRef.current);
  }, []);

  return (
    <div className={styles.main}>
      <HeaderPage/>
      <div className={styles.contents}>
        <ImageFilesPage/>
        <Editor image={image}/>
        <TmpBar mode={mode} onModeChange={setMode}/>
        {/*<ObjectPage/>*/}
      </div>
    </div>
  );
}
