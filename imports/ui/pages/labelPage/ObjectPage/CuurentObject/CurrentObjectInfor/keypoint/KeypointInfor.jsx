import React, { useState } from 'react';

import styles from './KeypointInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

import KeypointList from './keypointList/KeypointList';

export default function KeypointInfor({ objectColorValues }) {
  const [keypointInfor, setKeypointInfor] = useState({
    class: '',
    visible: true,
    color: '#25262b',
    number: '',
    keypointPallteConfig: false,
  });

  const keypointClassInfor = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' },
  ];

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
      <div>7</div>

      <div
        className={styles.dropdownBtn}
        onClick={() => {
          setKeypointListToggle((pre) => !pre);
          console.log(keypointListToggle);
        }}
      ></div>
      {keypointListToggle ? <KeypointList /> : ''}
    </div>
  );
}
