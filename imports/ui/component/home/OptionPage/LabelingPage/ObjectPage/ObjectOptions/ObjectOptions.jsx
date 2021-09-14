import React, { useEffect, useState } from "react";
import styles from "./ObjectOptions.module.css";

import objectForm from "../ObjectPage";

function AddObject({ setObjects }) {
  const [objectNo, setObjectNo] = useState(0);
  const addObjectFunc = () => {
    setObjects((pre) => [
      ...pre,
      {
        bBox: [0, 0, 0, 0], // xmin, ymin, w, h
        keyPoint: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ], // [x,y,v]
        polygon: [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ], // [x,y],[x,y],[x,y] ...
        state1: "",
        state2: "",
        objectTracking: 0,
        objectNo: objectNo,
      },
    ]);
    setObjectNo((pre) => pre + 1);
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

export default function ObjectOptions({ setObjects }) {
  return (
    <div className={styles.pageWrap}>
      <AddObject setObjects={setObjects} />
      <div style={{ display: "flex", gap: "10px" }}>
        <ConfirmObject />
        <CancleObject />
      </div>
    </div>
  );
}
