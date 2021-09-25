import React, { useState } from 'react';

import styles from './StateInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

export default function StateInfor({ state }) {
  const [stateInfor, setStateInfor] = useState('');

  const stateClassInfor = [state.action1, state.action2]

  return (
    <div className={styles.stateInforWrap}>
      <div>{state.stateName}</div>

      <Select size="xs" data={stateClassInfor} onChange={setStateInfor} style={{ width: '80px' }} />
    </div>
  );
}
