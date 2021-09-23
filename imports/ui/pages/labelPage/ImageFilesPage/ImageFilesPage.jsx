import React, { useEffect, useState } from 'react';
import styles from './ImageFilesPage.module.css';

export default function ImageFilesPage({ currentImagesInfo, setCurrentImageInfo }) {
  // Error, Done, Have to work
  const imageState = ['#dd7171', '#61c46e', '#cccccc'];
  const selectCurrentImage = (currentImage) => {
    setCurrentImageInfo(currentImage);
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.imageFilesBigWrap}>
        <div className={styles.imageFilesSmallWrap}>
          {currentImagesInfo
            ? currentImagesInfo.map((e) => (
                <div
                  key={e._id}
                  className={styles.imageFiles}
                  style={{
                    backgroundColor: e.confirmFlag ? `${imageState[1]}` : `${imageState[2]}`,
                  }}
                  onClick={() => selectCurrentImage(e)}
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
