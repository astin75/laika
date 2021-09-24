import React, { useEffect, useState } from 'react';
import styles from './CurrentObject.module.css';
import CurrentObjectOptions from './CurrentObjectOptions/CurrentObjectOptions';
import CurrentObjectInfor from './CurrentObjectInfor/CurrentObjectInfor';

export default function CurrentObject({ currentObject, currentProjectInfo }) {
  // console.log(currentObject.objectId);
  return (
    <div className={styles.pageWrap}>
      <div className={styles.selectedObject}>
        {currentObject ? `[Object ${currentObject.objectId}]` : ''}
      </div>
      {/* 프로젝트에서 설정한 label 종류 옵션 바*/}
      {currentProjectInfo ? <CurrentObjectOptions currentProjectInfo={currentProjectInfo} /> : ''}

      {/* 현재 내가 클릭한 object의 infor*/}
      {currentObject ? (
        <CurrentObjectInfor currentObject={currentObject} currentProjectInfo={currentProjectInfo} />
      ) : (
        ''
      )}
    </div>
  );
}
