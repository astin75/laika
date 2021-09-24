import React, { useState } from 'react';

import styles from './StateInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

export default function StateInfor({ idx }) {
  const [stateInfor, setStateInfor] = useState('');

  const stateClassInfor = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' },
  ];

  return (
    <div className={styles.stateInforWrap}>
      <div>State{idx}</div>
      <Select size="xs" data={stateClassInfor} onChange={setStateInfor} />
    </div>
  );
}
