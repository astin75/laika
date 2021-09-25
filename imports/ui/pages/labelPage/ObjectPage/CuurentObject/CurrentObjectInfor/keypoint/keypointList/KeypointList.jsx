import React, { useState } from 'react';

import styles from './KeypointList.module.css';
import { Select, ColorPicker } from '@mantine/core';

//


export default function KeypointList({currentProjectInfo}) {
  const keypointClassList = ['visible', 'invisible'];
  const keypointArr = currentProjectInfo.keypoint;
  const [keypointClass, setKeyPointClass] = useState('');

  return (
    <div className={styles.listWrap}>
      {keypointArr.map((e) => (
        <div key={e} className={styles.list}>
          <i className="fas fa-map-marker-alt"></i>
          <div className={styles.listTitle}>{e}</div>

          <div className={styles.listOptionList}>
            <i className="fas fa-trash-alt"></i>

            <Select
              size="xs"
              data={keypointClassList}
              onChange={(e) => {
                setKeyPointClass(e);
              }}
              style={{ width: '80px' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
