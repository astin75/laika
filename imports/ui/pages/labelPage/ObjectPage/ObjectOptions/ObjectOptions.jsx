import React, { useEffect, useState } from 'react';
import styles from './ObjectOptions.module.css';

import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';

function AddObject({ currentImageInfo, setObjects }) {
  const addObjectFunc = () => {
    const RandValue = new Uint32Array(1);
    window.crypto.getRandomValues(RandValue);

    const tempObjectInfo = {
      projectName: false,
      masterProjectName: false,
      projectId: false,
      bbox: [],
      keypoint: [],
      stateList: [],
      polygon: [],
      objectId: RandValue[0],
      ImgFileId: currentImageInfo._id,
      ImgFileName: currentImageInfo.fileName,
    };

    setObjects((pre) => [...pre, tempObjectInfo]);
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

export default function ObjectOptions({ currentImageInfo, setObjects }) {
  return (
    <div className={styles.pageWrap}>
      <AddObject currentImageInfo={currentImageInfo} setObjects={setObjects} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <ConfirmObject />
        <CancleObject />
      </div>
    </div>
  );
}
