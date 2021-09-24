import React, { useEffect, useState } from 'react';
import styles from './ImageFilesPage.module.css';
import { Table } from '@mantine/core';

export default function ImageFilesPage({ currentImagesInfo, setCurrentImageInfo }) {
  // Error, Done, Have to work
  const imageState = ['#dd7171', '#61c46e', '#cccccc'];
  const selectCurrentImage = (currentImage) => {
    setCurrentImageInfo(currentImage);
  };

  const imageHoverOnFunc = (e) => {
    e.target.style.background = 'red';
  };
  const imageHoverOffFunc = (e) => {
    e.target.style.background = e.confirmFlag ? `${imageState[1]}` : `${imageState[2]}`;
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.imageFilesBigWrap}>
        <div className={styles.imageFilesSmallWrap}>
          <div className={styles.imageFilesTitle}>Image File List</div>
          {currentImagesInfo
            ? currentImagesInfo.map((e) => (
                <div
                  key={e._id}
                  className={styles.imageFiles}
                  style={{
                    backgroundColor: e.confirmFlag ? `${imageState[1]}` : `${imageState[2]}`,
                  }}
                  onClick={() => selectCurrentImage(e)}
                  onMouseOver={imageHoverOnFunc}
                  onMouseOut={imageHoverOffFunc}
                >
                  {e.fileName}
                </div>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
}
