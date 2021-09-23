import React, { useEffect, useState } from 'react';
import styles from './ObjectPage.module.css';

import Objects from './Objects/Objects';
import ObjectOptions from './ObjectOptions/ObjectOptions';
import CurrentObject from './CuurentObject/CurrentObject';

export default function ObjectPage({ currentProjectInfo, currentImageInfo }) {
  const [currentObject, setCurrentObject] = useState(null);
  const [objects, setObjects] = useState([]);

  return (
    <div className={styles.pageBigWrap}>
      <div className={styles.pageSmallWrap}>
        <ObjectOptions currentImageInfo={currentImageInfo} setObjects={setObjects} />
        <CurrentObject currentObject={currentObject} currentProjectInfo={currentProjectInfo} />
        <Objects
          objects={objects}
          setCurrentObject={setCurrentObject}
          setObjects={setObjects}
          currentImageInfo={currentImageInfo}
        />
      </div>
    </div>
  );
}
