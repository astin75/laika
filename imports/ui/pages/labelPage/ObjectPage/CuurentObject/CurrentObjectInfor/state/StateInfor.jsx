import React, { useState } from 'react';

import styles from './StateInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { annotationDispatcherState, currentAnnotations, selectionIdx } from 'imports/recoil/annotation';
import _ from 'lodash';

export default function StateInfor({ state }) {
  const annotations = useRecoilValue(currentAnnotations);
  const selection = useRecoilValue(selectionIdx);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);

  const stateClassInfor = [state.action1, state.action2, '선택안됨'];

  const updateAnnotationState = (e) => {
    const newAnnot = _.cloneDeep(annotations[selection]);
    newAnnot.meta[state.stateName] = e;
    annotationDispatcher?.edit(selection, newAnnot, false);
  };

  return (
    <div className={styles.stateInforWrap}>
      <div>{state.stateName}</div>

      <Select size='xs' data={stateClassInfor} value={annotations[selection]?.meta[state.stateName] ?? '선택안됨'}
              onChange={(e) => {
                updateAnnotationState(e);
              }} style={{ width: '80px' }} />
    </div>
  );
}
