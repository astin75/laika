import React, { useState } from 'react';

import styles from './CurrentObjectInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

import BboxInfor from './bbox/BboxInfor';
import KeypointInfor from './keypoint/KeypointInfor';
import PolygonInfor from './polygon/PolygonInfor';
import StateInfor from './state/StateInfor';
import ObjectTrackingInfor from './objectTracking/ObjectTrackingInfor';

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
  '#fd7e14'
];

export default function CurrentObjectInfor({ currentProjectInfo, setMode }) {
  // console.log(currentProjectInfo);

  return (
    <div className={styles.currentObjectInforWrap}>
      {currentProjectInfo.bbox.length > 0 ? (
        <BboxInfor objectColorValues={objectColorValues} currentProjectInfo={currentProjectInfo} />
      ) : (
        ''
      )}
      {currentProjectInfo.polygon ? <PolygonInfor objectColorValues={objectColorValues} /> : ''}
      {currentProjectInfo.keypoint.length > 0 ? (
        <KeypointInfor objectColorValues={objectColorValues} currentProjectInfo={currentProjectInfo} />
      ) : (
        ''
      )}
      {currentProjectInfo.stateList.map((stat) => (<StateInfor state={stat} key={stat.stateName}/>))}
      <ObjectTrackingInfor setMode={setMode}/>
    </div>
  );
}
