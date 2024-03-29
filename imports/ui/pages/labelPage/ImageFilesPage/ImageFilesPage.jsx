import { Table, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import styles from './ImageFilesPage.module.css';

export default function ImageFilesPage({ currentImagesInfo, currentImageInfo, setCurrentImageInfo }) {
  // Error, Done, Have to work, selected
  const imageState = ['#dd7171', '#61c46e', '#cccccc', '#70a1e2'];

  const [selectedImage, setSelectedImage] = useState('');

  // 현재 이미지 클릭 시, 현재 클릭한 이미지 정보가 변수에 담김 --> objectPage로 전달
  const selectCurrentImage = (currentImage) => {
    setCurrentImageInfo(currentImage);
    setSelectedImage(currentImage.fileName);
  };

  useEffect(() => {
    if (currentImageInfo) {
      setSelectedImage(currentImageInfo.fileName);
    }
  }, [currentImageInfo]);

  // const imageHoverOnFunc = (e) => {
  //   e.target.style.background = 'rgba(0, 227, 180)';
  // };
  // const imageHoverOffFunc = (e) => {
  //   e.target.style.background = e.confirmFlag ? `${imageState[1]}` : `#ffffff`;
  // };

  const getStateColor = (e) => {
    switch (e.confirmFlag) {
      case 'ready':
        return '#cccccc';
      case 'working':
        return '#70a1e2';
      case 'done':
        return '#61c46e';
    }
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.imageFilesBigWrap}>
        <div className={styles.imageFilesSmallWrap}>
          <div className={styles.imageFilesTitle}>이미지 리스트</div>
          {currentImagesInfo
            ? currentImagesInfo.map((e) => (
              <div
                key={e._id}
                className={styles.imageFiles}
                onClick={() => selectCurrentImage(e)}
                style={{
                  backgroundColor: e.fileName == selectedImage ? `rgba(0, 227, 180)` : ''
                }}
              >
                <Tooltip label={e.fileName} width={"auto"}>
                <div className={styles.imageFilesName}>{e.fileName}</div>
                </Tooltip>
                <div
                  className={styles.imageFileState}
                  style={{
                    backgroundColor: getStateColor(e)
                  }}
                />
              </div>
            ))
            : ''}
        </div>
      </div>
    </div>
  );
}
