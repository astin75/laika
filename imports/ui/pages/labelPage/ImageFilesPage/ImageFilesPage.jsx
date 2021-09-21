import React, { useEffect, useState } from "react";
import styles from "./ImageFilesPage.module.css";

export default function ImageFilesPage() {
  const images = [
    ["Image1", "0"],
    ["Image2", "1"],
    ["Image3", "2"],
    ["Image4", "0"],
    ["Image5", "1"],
    ["Image7", "1"],
    ["Image8", "0"],
    ["Image9", "1"],
    ["Image10", "1"],
    ["Image11", "2"],
    ["Image12", "2"],
    ["Image13", "1"],
    ["Image14", "0"],
    ["Image15", "1"],
    ["Image16", "2"],
    ["Image17", "2"],
    ["Image18", "1"],
    ["Image19", "1"],
    ["Image20", "1"],
    ["Image21", "2"],
    ["Image22", "0"],
    ["Image23", "1"],
  ];

  // Error, Done, Have to work
  const imageState = ["#dd7171", "#61c46e", "#cccccc"];

  return (
    <div className={styles.pageWrap}>
      <div className={styles.imageFilesBigWrap}>
        <div className={styles.imageFilesSmallWrap}>
          {images.map((e) => (
            <div
              key={e[0]}
              className={styles.imageFiles}
              style={{ backgroundColor: `${imageState[e[1]]}` }}
            >
              {e[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
