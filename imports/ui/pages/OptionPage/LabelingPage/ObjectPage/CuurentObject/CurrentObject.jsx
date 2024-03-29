import React, { useEffect, useState } from 'react'
import styles from './CurrentObject.module.css'
import CurrentObjectOptions from './CurrentObjectOptions/CurrentObjectOptions'
import CurrentObjectInfor from './CurrentObjectInfor/CurrentObjectInfor'

export default function CurrentObject({ currentObject, currentProjectInfo }) {
  // console.log(currentObject.objectId);
  return (
    <div className={styles.pageWrap}>
      <div className={styles.selectedObject}>
        {/* Selected Object */}
        {currentObject ? `[Object ${currentObject.objectId}]` : ''}
      </div>
      {currentProjectInfo ? <CurrentObjectOptions currentProjectInfo={currentProjectInfo} /> : ''}
      {currentObject ? (
        <CurrentObjectInfor currentObject={currentObject} currentProjectInfo={currentProjectInfo} />
      ) : (
        ''
      )}
    </div>
  )
}
