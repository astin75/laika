import React, { useState } from 'react';

import styles from './BboxInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  annotationDispatcherState,
  currentAnnotations,
  selectionIdx
} from 'imports/recoil/annotation';
import _ from 'lodash';

import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-akar-icons/eye';
import eyeSlashed from '@iconify/icons-akar-icons/eye-slashed';

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

  const bboxClassInfor = currentProjectInfo.bbox.map((cls) => ({ value: cls, label: cls }));
  bboxClassInfor.push({ value: 'undefined', label: '선택안됨' });

  return (
    <div className={styles.bboxWrap}>
      <div className={styles.bboxleftWrap}>
        {bboxInfor.visible === true ? (
          <div
            onClick={() => {
              setBboxInfor((pre) => ({ ...pre, visible: false }));
              const newAnnot = _.cloneDeep(annotations[selection]);
              newAnnot.regions.rect.visible = false;
              annotationDispatcher?.edit(selection, newAnnot, false);
            }}
          >
            <Icon icon={eyeIcon} style={{ fontSize: '20px' }} />
          </div>
        ) : (
          <div
            onClick={() => {
              setBboxInfor((pre) => ({ ...pre, visible: true }));
              const newAnnot = _.cloneDeep(annotations[selection]);
              newAnnot.regions.rect.visible = true;
              annotationDispatcher?.edit(selection, newAnnot, false);
            }}
          >
            <Icon icon={eyeSlashed} style={{ fontSize: '20px' }} />
          </div>
        )}
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
              swatchesPerRow={2}
              style={{ width: '40px' }}
            />
          </div>
        </div>
        <div>Box</div>
      </div>

      <Select
        size='xs'
        data={bboxClassInfor}
        value={annotations[selection].className}
        onChange={(e) => {
          const currentAnnot = { ...annotations[selection] };
          const classIdx = currentProjectInfo.bbox.findIndex((cls) => cls === e);
          console.log(classIdx)
          if (classIdx > -1){

            currentAnnot.color = currentProjectInfo.color[classIdx];
            console.log('color', currentProjectInfo.color[classIdx])
          }
          annotationDispatcher?.edit(selection, { ...currentAnnot, className: e }, false);
          setBboxInfor((pre) => ({ ...pre, class: e }));
        }}
        style={{ width: '80px' }}
      />
    </div>
  );
}
