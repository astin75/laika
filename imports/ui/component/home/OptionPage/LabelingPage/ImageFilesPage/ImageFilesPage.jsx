import React, { useEffect, useState } from "react";
import styles from "./ImageFilesPage.module.css";

export default function ImageFilesPage({ currentImageInfo }) {
  // Error, Done, Have to work
  const imageState = ["#dd7171", "#61c46e", "#cccccc"];

  return (
    <div className={styles.pageWrap}>
      <div className={styles.imageFilesBigWrap}>
        <div className={styles.imageFilesSmallWrap}>
          {currentImageInfo
            ? currentImageInfo.map((e) => (
                <div
                  key={e._id}
                  className={styles.imageFiles}
                  style={{ backgroundColor: `${imageState[1]}` }}
                >
                  {e.fileName}
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
