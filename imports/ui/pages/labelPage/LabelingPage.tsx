import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import {
  AnnotationDispatcher,
  annotationDispatcherState,
  createAnnotationDispatcher,
} from '../../../recoil/annotation';
import Editor, { EditorMode } from './Editor';
import HeaderPage from './HeaderPage/HeaderPage';
import ImageFilesPage from './ImageFilesPage/ImageFilesPage';
import styles from './LabelingPage.module.css';
import ObjectPage from './ObjectPage/ObjectPage';
import TmpBar from './TmpBar';

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

  // TODO: 우측? 상단? 에서 Rect, Polygon 버튼 누르면 변경되면 됨
  const [mode, setMode] = useState<EditorMode>(EditorMode.Idle);

  // Annotation Dispatcher 초기화
  const setAnnotationDispatcher = useSetRecoilState(annotationDispatcherState);
  const dispatcherRef = useRef<AnnotationDispatcher>(createAnnotationDispatcher());
  useEffect(() => {
    setAnnotationDispatcher(dispatcherRef.current);
  }, []);

  return (
    <div className={styles.main}>
      <HeaderPage />
      <div className={styles.contents}>
        <ImageFilesPage />
        {/* 라벨링 작업하는 중앙 캔버스 */}
        <Editor image={image} mode={mode} />
        {/* 임시로 데이터 확인하려고 넣은 우측바 */}
        <TmpBar mode={mode} onModeChange={setMode} />
        {/*<ObjectPage/>*/}
      </div>
    </div>
  );
}
