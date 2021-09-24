import React, { useState } from 'react';

import styles from './ObjectTrackingInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

export default function ObjectTrackingInfor() {
  const [objectTrackingInfor, setObjectTrackingInfor] = useState('');

  const objectTrackingClassInfor = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' },
  ];

  return (
    <div className={styles.objectTrackingInforWrap}>
      <div>Object Tracking ID</div>
      <Select
        size="xs"
        data={objectTrackingClassInfor}
        onChange={setObjectTrackingInfor}
        style={{ width: '80px' }}
      />
    </div>
  );
}
