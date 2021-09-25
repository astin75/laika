import React, { useState } from 'react';

import styles from './KeypointInfor.module.css';
import { Select, ColorPicker } from '@mantine/core';

import KeypointList from './keypointList/KeypointList';
import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { annotationDispatcherState, currentAnnotations, selectionIdx } from 'imports/recoil/annotation';

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
      {keypointInfor.visible === true ? (
        <div
          onClick={() => {
            setKeypointInfor((pre) => ({ ...pre, visible: false }));
            const newAnnot = _.cloneDeep(annotations[selection]);
            newAnnot.regions.keypoint.visible = false;
            annotationDispatcher?.edit(selection, newAnnot, false);
          }}
        >
          <i className="far fa-eye"></i>
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
          <i className="far fa-eye-slash"></i>
        </div>
      )}
      <div className={styles.keypointTitle}>Keypoint</div>

      <div
        className={styles.dropdownBtn}
        onClick={() => {
          setKeypointListToggle((pre) => !pre);
        }}
      ></div>
      {keypointListToggle ? <KeypointList currentProjectInfo={currentProjectInfo}/> : ''}
    </div>
  );
}
