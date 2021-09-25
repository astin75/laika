import React, { useState } from 'react';

import styles from './KeypointInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

import KeypointList from './keypointList/KeypointList';

export default function KeypointInfor({ objectColorValues, currentProjectInfo }) {
  const [keypointInfor, setKeypointInfor] = useState({
    class: '',
    visible: true,
    color: '#25262b',
    number: '',
    keypointPallteConfig: false,
  });

  const [keypointListToggle, setKeypointListToggle] = useState(false);

  return (
    <div className={styles.keypointWrap}>
      {keypointInfor.visible === true ? (
        <div
          onClick={() => {
            setKeypointInfor((pre) => ({ ...pre, visible: false }));
          }}
        >
          <i className="far fa-eye"></i>
        </div>
      ) : (
        <div
          onClick={() => {
            setKeypointInfor((pre) => ({ ...pre, visible: true }));
          }}
        >
          <i className="far fa-eye-slash"></i>
        </div>
      )}
      <div className={styles.keypointTitle}>Keypoint</div>

      <div
        className={styles.dropdownBtn}
        onClick={() => {
          setKeypointListToggle((pre) => !pre);
        }}
      ></div>
      {keypointListToggle ? <KeypointList currentProjectInfo={currentProjectInfo}/> : ''}
    </div>
  );
}
