import React, { useState } from 'react';

import styles from './BboxInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

export default function BboxInfor({ objectColorValues }) {
  const [bboxInfor, setBboxInfor] = useState({
    class: '',
    visible: true,
    color: '#25262b',
    number: '',
    bboxPallteConfig: false,
  });

  const bboxClassInfor = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' },
  ];

  return (
    <div className={styles.bboxWrap}>
      {bboxInfor.visible === true ? (
        <div
          onClick={() => {
            setBboxInfor((pre) => ({ ...pre, visible: false }));
          }}
        >
          <i className="far fa-eye"></i>
        </div>
      ) : (
        <div
          onClick={() => {
            setBboxInfor((pre) => ({ ...pre, visible: true }));
          }}
        >
          <i className="far fa-eye-slash"></i>
        </div>
      )}
      <div>Box</div>
      <div
        className={styles.bboxColor}
        style={{ backgroundColor: `${bboxInfor.color}` }}
        onClick={() => {
          setBboxInfor((pre) => ({
            ...pre,
            bboxPallteConfig: !bboxInfor.bboxPallteConfig,
          }));
        }}
      >
        <div
          className={styles.bboxColorSelect}
          style={{ display: bboxInfor.bboxPallteConfig ? 'block' : 'none' }}
        >
          <ColorPicker
            size="xs"
            withPicker={false}
            value={bboxInfor.color}
            onChange={(e) => {
              setBboxInfor((pre) => ({ ...pre, color: e, bboxInfor: false }));
            }}
            swatches={objectColorValues}
          />
        </div>
      </div>

      <Select
        size="xs"
        data={bboxClassInfor}
        onChange={(e) => {
          setBboxInfor((pre) => ({ ...pre, class: e }));
        }}
        style={{ width: '80px' }}
      />
    </div>
  );
}
