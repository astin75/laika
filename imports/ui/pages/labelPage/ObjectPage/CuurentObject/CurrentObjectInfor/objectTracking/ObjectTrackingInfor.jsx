import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import styles from './ObjectTrackingInfor.module.css';
import { NumberInput, ColorPicker } from '@mantine/core';
import { EditorMode } from 'ui/pages/labelPage/Editor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { annotationDispatcherState, currentAnnotations, selectionIdx } from 'imports/recoil/annotation';

export default function ObjectTrackingInfor({ setMode }) {
  const [objectTrackingInfor, setObjectTrackingInfor] = useState('');

  const objectTrackingClassInfor = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' }
  ];

  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);
  const selectionRef = useRef(undefined);
  const disablePropagation = () => {
    setMode(EditorMode.Idle);
  };

  const setID = (e) => {
    // console.log('change call', e);
    // if (selection !== selectionRef.current){
    //   selectionRef.current = selection;
    //   return;
    // }
    if (selection !== undefined) {
      const newAnnot = _.cloneDeep(annotations[selection]);
      newAnnot.meta['trackingId'] = Number(e.target.value);
      annotationDispatcher?.edit(selection, newAnnot, false);
    }
  };

  return (
    <div className={styles.objectTrackingInforWrap}>
      <div>Object Tracking ID</div>
      <input
        min={0}
        type='number'
        readOnly={false}
        onClick={() => disablePropagation()}
        onChange={(e) => setID(e)}
        value={annotations[selection]?.meta?.trackingId ?? 0}
        style={{ width: '80px', height: '18px' }}
      />
      {/*<NumberInput size={'xs'} min={0} style={{ width: '80px' }} onClick={() => disablePropagation()}*/}
      {/*             onChange={(e) => setID(e)}*/}
      {/*             value={annotations[selection]?.meta?.trackingId ?? 0} />*/}
    </div>
  );
}
