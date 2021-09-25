import React, { useEffect, useState } from 'react';
import styles from './ObjectOptions.module.css';

import { Icon } from '@iconify/react';
import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';
import { useRecoilValue } from 'recoil';
import { annotationDispatcherState } from 'imports/recoil/annotation';

function AddObject({ currentImageInfo, currentProjectInfo }) {
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);

  const addObjectFunc = () => {
    // 현재 이미지를 선택해야만 object를 추가할수 있음
    if (!currentImageInfo) {
      alert('이미지를 먼저 클릭해주세요');
      return;
    }
    annotationDispatcher?.insert(currentProjectInfo.keypoint.length > 0, currentProjectInfo);
  };

  return (
    <div className={styles.addObjectWrap} onClick={addObjectFunc}>
      <div className={styles.addObjectBarVertical}></div>
      <div className={styles.addObjectBarHorizontal}></div>
    </div>
  );
}

function ConfirmObject() {
  return (
    <div className={styles.confirmObjectWrap}>
      <div className={styles.confirmObjectLeft}></div>
      <div className={styles.confirmObjectRight}></div>
    </div>
  );
}

function CancleObject() {
  return (
    <div className={styles.cancleObjectWrap}>
      <div className={styles.cancleObjectLeft}></div>
      <div className={styles.cancleObjectRight}></div>
    </div>
  );
}

export default function ObjectOptions({ currentImageInfo, currentProjectInfo}) {
  return (
    <div className={styles.pageWrap}>
      <AddObject currentImageInfo={currentImageInfo} currentProjectInfo={currentProjectInfo}/>
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* <ConfirmObject /> */}
        <Icon icon="emojione:white-heavy-check-mark" style={{ width: '21px', height: '21px' }} />
        <CancleObject />
      </div>
    </div>
  );
}
