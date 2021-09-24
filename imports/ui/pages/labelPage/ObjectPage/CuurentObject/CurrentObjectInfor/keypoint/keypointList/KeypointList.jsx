import React, { useState } from 'react';

import styles from './KeypointList.module.css';
import { Select, ColorPicker } from '@mantine/core';

//
const keypointArr = [
  'neck',
  'right_shoulder',
  'left_shoulder',
  'right_knee',
  'left_knee',
  'right-hip',
  'left-hip',
];

export default function KeypointList() {
  const keypointClassList = ['cat', 'dog', 'cow'];
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
