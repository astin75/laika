import eyeIcon from '@iconify/icons-akar-icons/eye';
import eyeSlashed from '@iconify/icons-akar-icons/eye-slashed';
import { Icon } from '@iconify/react';
import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';
import {
  annotationDispatcherState,
  currentAnnotations,
  selectionIdx
} from 'imports/recoil/annotation';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import _ from 'lodash'
import styles from './Objects.module.css';
import { canvasViewDispatcherState } from 'imports/recoil/canvas';

export default function Objects({ currentImageInfo }) {
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);
  const [selectedObject, setSelectedObject] = useState('');
  const canvasViewDispatcher = useRecoilValue(canvasViewDispatcherState);

  const deleteAnnotation = (idx) => {
    // annotationDispatcher?.setSelectionAnnotation(idx, true);
    // annotationDispatcher?.del();
    annotationDispatcher?.remove(idx);
  };

  const selectAnnotation = (idx) => {
    annotationDispatcher?.setSelectionAnnotation(selection, false);
    annotationDispatcher?.setSelectionAnnotation(idx, true);
    setSelection(idx);
    if (annotations[idx].regions.rect)
      annotationDispatcher?.highlightRect(idx, undefined);
    setSelectedObject(idx);
    canvasViewDispatcher?.refreshCanvas();
  };

  // console.log(objects);

  const setVisible = (idx) => {
    const newAnnot = _.cloneDeep(annotations[idx])
    if(newAnnot.regions.rect)
      newAnnot.regions.rect.visible = true
    if(newAnnot.regions.polygon)
      newAnnot.regions.polygon.visible = true
    if(newAnnot.regions.keypoint)
      newAnnot.regions.keypoint.visible = true
    annotationDispatcher?.edit(idx, newAnnot, true)
  };

  const setInvisible = (idx) => {
    const newAnnot = _.cloneDeep(annotations[idx])
    if(newAnnot.regions.rect)
      newAnnot.regions.rect.visible = false
    if(newAnnot.regions.polygon)
      newAnnot.regions.polygon.visible = false
    if(newAnnot.regions.keypoint)
      newAnnot.regions.keypoint.visible = false
    annotationDispatcher?.edit(idx, newAnnot, true)
  };

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
                backgroundColor: idx == selectedObject ? `rgba(0, 227, 180)` : ''
              }}
            >
              <Icon icon={eyeIcon} style={{ fontSize: '20px' }} onClick={() => setVisible(idx)} />
              <Icon icon={eyeSlashed} style={{ fontSize: '20px' }} onClick={() => setInvisible(idx)} />

              <div className={styles.objectTitle} onClick={() => selectAnnotation(idx)}>
                object {annot.key}
              </div>
              <Icon icon='bi:trash' onClick={() => deleteAnnotation(idx)} />
            </div>
          ))
          : ''}
      </div>
    </div>
  );
}
