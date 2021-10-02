import React, { useEffect, useState } from 'react';

import styles from './StateInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { annotationDispatcherState, currentAnnotations, selectionIdx } from 'imports/recoil/annotation';
import _ from 'lodash';

export default function StateInfor({ state, enableKey }) {
  const annotations = useRecoilValue(currentAnnotations);
  const selection = useRecoilValue(selectionIdx);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);

  const stateClassInfor = [state.action1, state.action2, '선택안됨'];

  const updateAnnotationState = (e) => {
    const newAnnot = _.cloneDeep(annotations[selection]);
    if (e === '선택안됨')
      delete newAnnot.meta[state.stateName];
    else
      newAnnot.meta[state.stateName] = e;
    annotationDispatcher?.edit(selection, newAnnot, false);
  };

  const keyDownHandler = (e) => {
    const newAnnot = _.cloneDeep(annotations[selection]);
    if (e.key === '[') {
      newAnnot.meta[state.stateName] = stateClassInfor[0];
    }
    if (e.key === ']') {
      newAnnot.meta[state.stateName] = stateClassInfor[1];
    }
    annotationDispatcher?.edit(selection, newAnnot, false);
  };
  useEffect(() => {
    if (enableKey) {
      document.addEventListener('keydown', keyDownHandler);
      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }
  });

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
