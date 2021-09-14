import React, { useEffect, useState } from "react";
import styles from "./CurrentObject.module.css";

function CurrentObjectOptions() {
  return (
    <div className={styles.currentObjectOptionsWrap}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function CurrentObjectInfor({ currentObject }) {
  return (
    <div className={styles.currentObjectInforWrap}>
      <div>
        bBox : [{currentObject.bBox[0]},{currentObject.bBox[1]},
        {currentObject.bBox[2]},{currentObject.bBox[3]}]
      </div>

      <div>
        keyPoint :{" "}
        {currentObject.keyPoint.map((e) => (
          <span key={String(e[0] + e[1] + e[2])}>
            [{e[0]},{e[1]},{e[2]}]
          </span>
        ))}{" "}
      </div>
      <div>
        Polygon :{" "}
        {currentObject.polygon.map((e) => (
          <span key={String(e[0] + e[1])}>
            [{e[0]},{e[1]}]
          </span>
        ))}{" "}
      </div>
      <div>state1 : {currentObject.state1} </div>
      <div>state2 : {currentObject.state2} </div>
      <div>object tracking : {currentObject.objectTracking}</div>
    </div>
  );
}

export default function CurrentObject({ currentObject }) {
  return (
    <div className={styles.pageWrap}>
      <div className={styles.selectedObject}>Selected Object</div>
      <CurrentObjectOptions />
      {currentObject ? (
        <CurrentObjectInfor currentObject={currentObject} />
      ) : (
        ""
      )}
    </div>
  );
}
