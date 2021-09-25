import React, { useState } from 'react';

import styles from './KeypointInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

import KeypointList from './keypointList/KeypointList';
import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  annotationDispatcherState,
  currentAnnotations,
  selectionIdx,
} from 'imports/recoil/annotation';

import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-akar-icons/eye';
import eyeSlashed from '@iconify/icons-akar-icons/eye-slashed';

export default function KeypointInfor({ objectColorValues, currentProjectInfo }) {
  const [keypointInfor, setKeypointInfor] = useState({
    class: '',
    visible: true,
    color: '#25262b',
    number: '',
    keypointPallteConfig: false,
  });

  const [keypointListToggle, setKeypointListToggle] = useState(false);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);

  return (
    <div className={styles.keypointWrap}>
      <div className={styles.keypointleftWrap}>
        {keypointInfor.visible === true ? (
          <div
            onClick={() => {
              setKeypointInfor((pre) => ({ ...pre, visible: false }));
              const newAnnot = _.cloneDeep(annotations[selection]);
              newAnnot.regions.keypoint.visible = false;
              annotationDispatcher?.edit(selection, newAnnot, false);
            }}
          >
            <Icon icon={eyeIcon} style={{ fontSize: '20px' }} />
          </div>
        ) : (
          <div
            onClick={() => {
              setKeypointInfor((pre) => ({ ...pre, visible: true }));
              const newAnnot = _.cloneDeep(annotations[selection]);
              newAnnot.regions.keypoint.visible = true;
              annotationDispatcher?.edit(selection, newAnnot, false);
            }}
          >
            <Icon icon={eyeSlashed} style={{ fontSize: '20px' }} />
          </div>
        )}
        <div className={styles.keypointTitle}>Keypoint</div>
      </div>
      <div
        className={styles.dropdownBtn}
        onClick={() => {
          setKeypointListToggle((pre) => !pre);
        }}
      ></div>
      {keypointListToggle ? <KeypointList currentProjectInfo={currentProjectInfo} /> : ''}
    </div>
  );
}
