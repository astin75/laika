import React, { useEffect, useState } from 'react';
import styles from './ObjectPage.module.css';

import Objects from './Objects/Objects';
import ObjectOptions from './ObjectOptions/ObjectOptions';
import CurrentObject from './CuurentObject/CurrentObject';

export default function ObjectPage({ currentProjectInfo, currentImageInfo }) {
  const [currentObject, setCurrentObject] = useState(null);
  const [objects, setObjects] = useState([]);

  return (
    <div className={styles.pageBigWrap}>
      <div className={styles.pageSmallWrap}>
        {/* 현재 이미지에서 오브젝트 추가, 이미지 라벨링 완료, 이미지 라벨링 보류 버튼 페이지 */}
        <ObjectOptions currentImageInfo={currentImageInfo} setObjects={setObjects} />

        {/* 현재 클릭한 Object의 정보를 표시하는 페이지 */}
        <CurrentObject currentObject={currentObject} currentProjectInfo={currentProjectInfo} />

        {/* 내가 추가한 object들의 리스트 정리 페이지 */}
        <Objects
          objects={objects}
          setCurrentObject={setCurrentObject}
          setObjects={setObjects}
          currentImageInfo={currentImageInfo}
        />
      </div>
    </div>
  );
}
