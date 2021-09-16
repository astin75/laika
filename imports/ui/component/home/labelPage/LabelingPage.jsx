import React, { useEffect, useState } from "react";

import ImageFilesPage from "./ImageFilesPage/ImageFilesPage";
import CanvasPage from "./CanvasPage/CanvasPage";
import ObjectPage from "./ObjectPage/ObjectPage";
import HeaderPage from "./HeaderPage/HeaderPage";

import styles from "./LabelingPage.module.css";

export default function LabelingPage() {
  return (
    <div className={styles.main}>
      <HeaderPage />
      <div className={styles.contents}>
        <ImageFilesPage />
        <CanvasPage />
        <ObjectPage />
      </div>
    </div>
  );
}
