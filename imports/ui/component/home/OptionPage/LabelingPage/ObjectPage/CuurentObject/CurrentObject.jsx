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

function CurrentObjectInfor() {
  return (
    <div className={styles.currentObjectInforWrap}>
      <div>bBox : </div>
      <div>keyPoint : </div>
      <div>Polygon : </div>
      <div>state1 : </div>
      <div>state2 : </div>
      <div>object tracking : </div>
    </div>
  );
}

export default function CurrentObject() {
  return (
    <div className={styles.pageWrap}>
      <div className={styles.selectedObject}>Selected Object</div>
      <CurrentObjectOptions />
      <CurrentObjectInfor />
    </div>
  );
}
