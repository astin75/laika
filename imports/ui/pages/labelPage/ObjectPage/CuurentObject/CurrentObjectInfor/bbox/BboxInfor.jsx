import React, { useState } from 'react';

import styles from './BboxInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { annotationDispatcherState, currentAnnotations, selectionIdx } from 'imports/recoil/annotation';

export default function BboxInfor({ objectColorValues, currentProjectInfo }) {
  const [bboxInfor, setBboxInfor] = useState({
    class: '',
    visible: true,
    color: '#25262b',
    number: '',
    bboxPallteConfig: false
  });

  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);

  console.log(currentProjectInfo);
  const bboxClassInfor = currentProjectInfo.bbox.map((cls) => ({ value: cls, label: cls }))
  bboxClassInfor.push({value: 'undefined', label: '선택안됨'});

  return (
    <div className={styles.bboxWrap}>
      {bboxInfor.visible === true ? (
        <div
          onClick={() => {
            setBboxInfor((pre) => ({ ...pre, visible: false }));
          }}
        >
          <i className='far fa-eye'></i>
        </div>
      ) : (
        <div
          onClick={() => {
            setBboxInfor((pre) => ({ ...pre, visible: true }));
          }}
        >
          <i className='far fa-eye-slash'></i>
        </div>
      )}
      <div>Box</div>
      <div
        className={styles.bboxColor}
        style={{ backgroundColor: `${bboxInfor.color}` }}
        onClick={() => {
          setBboxInfor((pre) => ({
            ...pre,
            bboxPallteConfig: !bboxInfor.bboxPallteConfig
          }));
        }}
      >
        <div
          className={styles.bboxColorSelect}
          style={{ display: bboxInfor.bboxPallteConfig ? 'block' : 'none' }}
        >
          <ColorPicker
            size='xs'
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
        size='xs'
        data={bboxClassInfor}
        value={annotations[selection].className}
        onChange={(e) => {
          const currentAnnot = { ...annotations[selection] };
          annotationDispatcher?.edit(selection, { ...currentAnnot, className: e }, false);
          setBboxInfor((pre) => ({ ...pre, class: e }));
        }}
        style={{ width: '80px' }}
      />
    </div>
  );
}
