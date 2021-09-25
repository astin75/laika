import React, { useEffect, useState } from 'react';
import styles from './Objects.module.css';
import { Icon } from '@iconify/react';
import { useTracker } from 'meteor/react-meteor-data';

import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  annotationDispatcherState,
  currentAnnotations,
  selectionIdx,
} from 'imports/recoil/annotation';

import eyeIcon from '@iconify/icons-akar-icons/eye';
import eyeSlashed from '@iconify/icons-akar-icons/eye-slashed';

export default function Objects({ currentImageInfo }) {
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);
  const [selectedObject, setSelectedObject] = useState('');

  const deleteAnnotation = (idx) => {
    // annotationDispatcher?.setSelectionAnnotation(idx, true);
    // annotationDispatcher?.del();
    annotationDispatcher?.remove(idx);
  };

  const selectAnnotation = (idx) => {
    annotationDispatcher?.setSelectionAnnotation(selection, false);
    annotationDispatcher?.setSelectionAnnotation(idx, true);
    setSelection(idx);
    setSelectedObject(idx);
  };

  // console.log(objects);

  return (
    <div className={styles.pageWrap}>
      <div className={styles.objectListTitle}>Objects</div>
      <div className={styles.objectListWrap}>
        {currentImageInfo !== null
          ? annotations.map((annot, idx) => (
              <div
                key={annot.key}
                className={styles.object}
                style={{
                  backgroundColor: idx == selectedObject ? `rgba(0, 227, 180)` : '',
                }}
              >
                <Icon icon={eyeIcon} style={{ fontSize: '20px' }} />
                <Icon icon={eyeSlashed} style={{ fontSize: '20px' }} />

                <div className={styles.objectTitle} onClick={() => selectAnnotation(idx)}>
                  object {annot.key}
                </div>
                <Icon icon="bi:trash" onClick={() => deleteAnnotation(idx)} />
              </div>
            ))
          : ''}
      </div>
    </div>
  );
}
