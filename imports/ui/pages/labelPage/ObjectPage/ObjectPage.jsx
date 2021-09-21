import React, { useEffect, useState } from "react";
import styles from "./ObjectPage.module.css";

import Objects from "./Objects/Objects";
import ObjectOptions from "./ObjectOptions/ObjectOptions";
import CurrentObject from "./CuurentObject/CurrentObject";

// export const objectForm = {
//   bBox: [0, 0, 0, 0], // xmin, ymin, w, h
//   keyPoint: [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
//   ], // [x,y,v]
//   polygon: [
//     [0, 0],
//     [0, 0],
//     [0, 0],
//     [0, 0],
//     [0, 0],
//   ], // [x,y],[x,y],[x,y] ...
//   state1: "car",
//   state2: "stop",
//   objectTracking: 0,
// };

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
