import React, { useEffect, useState } from 'react';
import styles from './Objects.module.css';
import { Icon } from '@iconify/react';
import { useTracker } from 'meteor/react-meteor-data';

import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';
import { useRecoilState, useRecoilValue } from 'recoil';
import { annotationDispatcherState, currentAnnotations, selectionIdx } from 'imports/recoil/annotation';

export default function Objects({currentImageInfo }) {
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);

  const deleteAnnotation = (idx) => {
    // annotationDispatcher?.setSelectionAnnotation(idx, true);
    // annotationDispatcher?.del();
    annotationDispatcher?.remove(idx);
  };

  const selectAnnotation = (idx) => {
    annotationDispatcher?.setSelectionAnnotation(selection, false);
    annotationDispatcher?.setSelectionAnnotation(idx, true);
    setSelection(idx);
  }

  // console.log(objects);

  return (
    <div className={styles.pageWrap}>
      <div className={styles.objectListTitle}>Objects</div>
      <div className={styles.objectListWrap}>
        {currentImageInfo !== null
          ? annotations.map((annot, idx) => (
              <div key={annot.key} className={styles.object}>
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
