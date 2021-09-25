import { Icon } from '@iconify/react';
import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';
import {
  annotationDispatcherState,
  currentAnnotations,
  selectionIdx,
} from 'imports/recoil/annotation';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
<<<<<<< HEAD

import styles from './Objects.module.css';
=======
import {
  annotationDispatcherState,
  currentAnnotations,
  selectionIdx,
} from 'imports/recoil/annotation';

import eyeIcon from '@iconify/icons-akar-icons/eye';
import eyeSlashed from '@iconify/icons-akar-icons/eye-slashed';
>>>>>>> eb3081c3a3c2928b5773b7d46af86371d44983e5

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
<<<<<<< HEAD
=======
    setSelectedObject(idx);
>>>>>>> eb3081c3a3c2928b5773b7d46af86371d44983e5
  };

  // console.log(objects);

  return (
    <div className={styles.pageWrap}>
      <div className={styles.objectListTitle}>객체</div>
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
