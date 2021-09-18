import React, { useEffect, useState } from 'react'
import styles from './ObjectPage.module.css'

import Objects from './Objects/Objects'
import ObjectOptions from './ObjectOptions/ObjectOptions'
import CurrentObject from './CuurentObject/CurrentObject'

export default function ObjectPage({ currentProjectInfo }) {
  const [currentObject, setCurrentObject] = useState(null)
  const [objects, setObjects] = useState([])

  // console.log(currentProjectInfo);
  return (
    <div className={styles.pageBigWrap}>
      <div className={styles.pageSmallWrap}>
        <ObjectOptions setObjects={setObjects} />
        <CurrentObject currentObject={currentObject} currentProjectInfo={currentProjectInfo} />
        <Objects setCurrentObject={setCurrentObject} objects={objects} />
      </div>
    </div>
  )
}
