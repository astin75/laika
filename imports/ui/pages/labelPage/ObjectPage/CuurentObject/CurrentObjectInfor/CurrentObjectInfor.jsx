import React, { useState } from 'react';

import styles from './CurrentObjectInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

import BboxInfor from './bbox/BboxInfor';

const objectColorValues = [
  '#25262b',
  '#868e96',
  '#fa5252',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#15aabf',
  '#12b886',
  '#40c057',
  '#82c91e',
  '#fab005',
  '#fd7e14',
];

export default function CurrentObjectInfor({ currentObject, currentProjectInfo }) {
  const [polygonInfor, setPolygonInfor] = useState({
    class: '',
    visible: true,
    color: '#25262b',
    number: '',
    bboxPallteConfig: false,
  });

  return (
    <div className={styles.currentObjectInforWrap}>
      {currentProjectInfo.bbox.length > 0 ? (
        <BboxInfor objectColorValues={objectColorValues} />
      ) : (
        ''
      )}
      <div>
        <div></div>
        <div>Polygon</div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div>Keypoint</div>
        <div></div>
      </div>
      <div>
        <div>
          <div>State1</div>
        </div>
        <div>
          <div>State2</div>
        </div>
        <div>
          <div>ID</div>
        </div>
      </div>
    </div>
  );
}
