import React, { useEffect, useState } from "react";
import styles from "./ObjectPage.module.css";

import Objects from "./Objects/Objects";
import ObjectOptions from "./ObjectOptions/ObjectOptions";
import CurrentObject from "./CuurentObject/CurrentObject";

export default function ObjectPage() {
  const [currentObject, setCurrentObject] = useState(null);
  const [objects, setObjects] = useState([]);
  return (
    <div className={styles.pageBigWrap}>
      <div className={styles.pageSmallWrap}>
        <ObjectOptions setObjects={setObjects} />
        <CurrentObject currentObject={currentObject} />
        <Objects setCurrentObject={setCurrentObject} objects={objects} />
      </div>
    </div>
  );
}
