import React, { useEffect, useState } from 'react'
import styles from './ObjectOptions.module.css'

import { imageInfoCollection } from 'imports/db/collections'
import { gtInfoCollection } from 'imports/db/collections'

function AddObject({ currentImageInfo }) {
  const [objectNo, setObjectNo] = useState(0)
  const addObjectFunc = () => {
    const RandValue = new Uint32Array(1)
    window.crypto.getRandomValues(RandValue)

    const tempObjectInfo = {
      projectName: false,
      masterProjectName: false,
      projectId: false,
      bbox: [],
      keypoint: [],
      stateList: [],
      polygon: [],
      objectId: false,
      ImgFileId: RandValue[0],
      ImgFileName: currentImageInfo.fileName,
    }

    imageInfoCollection.update({ _id: currentImageInfo._id }, { $push: { object: tempObjectInfo } })

    setObjectNo((pre) => pre + 1)
  }

  return (
    <div className={styles.addObjectWrap} onClick={addObjectFunc}>
      <div className={styles.addObjectBarVertical}></div>
      <div className={styles.addObjectBarHorizontal}></div>
    </div>
  )
}

function ConfirmObject() {
  return (
    <div className={styles.confirmObjectWrap}>
      <div className={styles.confirmObjectLeft}></div>
      <div className={styles.confirmObjectRight}></div>
    </div>
  )
}

function CancleObject() {
  return (
    <div className={styles.cancleObjectWrap}>
      <div className={styles.cancleObjectLeft}></div>
      <div className={styles.cancleObjectRight}></div>
    </div>
  )
}

export default function ObjectOptions({ currentImageInfo }) {
  return (
    <div className={styles.pageWrap}>
      <AddObject currentImageInfo={currentImageInfo} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <ConfirmObject />
        <CancleObject />
      </div>
    </div>
  )
}
