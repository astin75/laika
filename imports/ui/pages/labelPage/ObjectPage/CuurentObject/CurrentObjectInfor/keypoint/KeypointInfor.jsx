import React, { useState } from 'react';

import styles from './KeypointInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

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
      <div>Keypoint</div>
      <div>7</div>
      <div
        className={styles.keypointColor}
        style={{ backgroundColor: `${keypointInfor.color}` }}
        onClick={() => {
          setKeypointInfor((pre) => ({
            ...pre,
            keypointPallteConfig: !keypointInfor.keypointPallteConfig,
          }));
        }}
      >
        <div
          className={styles.keypointColorSelect}
          style={{ display: keypointInfor.keypointPallteConfig ? 'block' : 'none' }}
        >
          <ColorPicker
            size="xs"
            withPicker={false}
            value={keypointInfor.color}
            onChange={(e) => {
              setKeypointInfor((pre) => ({ ...pre, color: e, keypointInfor: false }));
            }}
            swatches={objectColorValues}
          />
        </div>
      </div>

      <Select
        size="xs"
        data={keypointClassInfor}
        onChange={(e) => {
          setKeypointInfor((pre) => ({ ...pre, class: e }));
        }}
      />
    </div>
  );
}
