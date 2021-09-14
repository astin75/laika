import React, { useEffect, useState } from "react";
import styles from "./ObjectPage.module.css";

import Objects from "./Objects/Objects";
import ObjectOptions from "./ObjectOptions/ObjectOptions";
import CurrentObject from "./CuurentObject/CurrentObject";

export default function ObjectPage() {
  return (
    <div className={styles.pageBigWrap}>
      <div className={styles.pageSmallWrap}>
        <ObjectOptions />
        <CurrentObject />
        <Objects />
      </div>
    </div>
  );
}
