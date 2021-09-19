import React, { useEffect, useState } from "react";
import styles from "./ObjectPage.module.css";

import Objects from "./Objects/Objects";
import ObjectOptions from "./ObjectOptions/ObjectOptions";
import CurrentObject from "./CuurentObject/CurrentObject";

export default function ObjectPage({ currentProjectInfo, currentImageInfo }) {
  const [currentObject, setCurrentObject] = useState(null);

  return (
    <div className={styles.pageBigWrap}>
      <div className={styles.pageSmallWrap}>
        <ObjectOptions currentImageInfo={currentImageInfo} />
        <CurrentObject
          currentObject={currentObject}
          currentProjectInfo={currentProjectInfo}
        />
        <Objects
          setCurrentObject={setCurrentObject}
          currentImageInfo={currentImageInfo}
        />
      </div>
    </div>
  );
}
