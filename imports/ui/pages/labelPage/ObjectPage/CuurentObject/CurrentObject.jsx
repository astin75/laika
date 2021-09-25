import React, { useEffect, useState } from 'react';
import styles from './CurrentObject.module.css';
import CurrentObjectOptions from './CurrentObjectOptions/CurrentObjectOptions';
import CurrentObjectInfor from './CurrentObjectInfor/CurrentObjectInfor';
import { useRecoilValue } from 'recoil';
import { currentAnnotations, selectionIdx } from 'imports/recoil/annotation';

export default function CurrentObject({ currentProjectInfo, mode, setMode }) {
  const annotations = useRecoilValue(currentAnnotations);
  const selection = useRecoilValue(selectionIdx);

  return (
    <div className={styles.pageWrap}>
      <div className={styles.selectedObject}>
        {selection !== undefined ? `[Object ${annotations[selection].key}]` : ''}
      </div>
      {/* 프로젝트에서 설정한 label 종류 옵션 바*/}
      {currentProjectInfo ? <CurrentObjectOptions currentProjectInfo={currentProjectInfo} mode={mode} setMode={setMode} /> : ''}

      {/* 현재 내가 클릭한 object의 infor*/}
      {selection !== undefined ? (
        <CurrentObjectInfor currentProjectInfo={currentProjectInfo} />
      ) : (
        ''
      )}
    </div>
  );
}
