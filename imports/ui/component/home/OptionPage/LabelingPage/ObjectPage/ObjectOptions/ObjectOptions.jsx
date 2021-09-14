import React, { useEffect, useState } from "react";
import styles from "./ObjectOptions.module.css";

function AddObject() {
  return (
    <div className={styles.addObjectWrap}>
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

export default function ObjectOptions() {
  return (
    <div className={styles.pageWrap}>
      <AddObject />
      <div style={{ display: "flex", gap: "10px" }}>
        <ConfirmObject />
        <CancleObject />
      </div>
    </div>
  );
}
