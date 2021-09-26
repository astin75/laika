import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import styles from './EditorOptions.module.css';
import { useRecoilValue } from 'recoil';
import { canvasViewDispatcherState } from 'imports/recoil/canvas';
import { annotationDispatcherState, currentAnnotations, selectionIdx } from 'imports/recoil/annotation';
import { EditorMode } from 'ui/pages/labelPage/Editor';
import _ from 'lodash';

import eyeIcon from '@iconify/icons-akar-icons/eye';
import eyeSlashed from '@iconify/icons-akar-icons/eye-slashed';
// import { Table } from '@mantine/core';

export default function EditorOptions({ mode, setMode }) {
  const canvasViewDispatcher = useRecoilValue(canvasViewDispatcherState);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);

  const [allObjectVisibleToggle, setAllObjectVisibleToggle] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState('');

  const setAllVisible = () => {
    annotations.forEach((annot, idx) => {
      const newAnnot = _.cloneDeep(annot);
      if (newAnnot.regions.rect)
        newAnnot.regions.rect.visible = true;
      if (newAnnot.regions.polygon)
        newAnnot.regions.polygon.visible = true;
      if (newAnnot.regions.keypoint)
        newAnnot.regions.keypoint.visible = true;
      annotationDispatcher?.edit(idx, newAnnot, true);
    });
  };

  const setAllInvisible = () => {
    annotations.forEach((annot, idx) => {
      const newAnnot = _.cloneDeep(annot);
      if (newAnnot.regions.rect)
        newAnnot.regions.rect.visible = false;
      if (newAnnot.regions.polygon)
        newAnnot.regions.polygon.visible = false;
      if (newAnnot.regions.keypoint)
        newAnnot.regions.keypoint.visible = false;
      annotationDispatcher?.edit(idx, newAnnot, true);
    });
  };

  return (
    <div className={styles.pageWrap}>
      <div
        className={styles.options}
        onClick={() => {
          canvasViewDispatcher?.zoomCanvas(1);
          setSelectedOptions('searchPlus');
        }}
        style={{ backgroundColor: selectedOptions == 'searchPlus' ? 'rgba(0, 227, 180)' : '' }}
      >
        <i className='fas  fa-search-plus' style={{ fontSize: '15px' }} />
      </div>
      <div
        className={styles.options}
        onClick={() => {
          canvasViewDispatcher?.zoomCanvas(-1);
          setSelectedOptions('searchMinus');
        }}
        style={{ backgroundColor: selectedOptions == 'searchMinus' ? 'rgba(0, 227, 180)' : '' }}
      >
        <i className='fas fa-search-minus' style={{ fontSize: '15px' }} />
      </div>
      <div
        className={styles.options}
        onClick={() => {
          setMode(EditorMode.Idle);
          setSelectedOptions('moveOne');
        }}
        style={{ backgroundColor: selectedOptions == 'moveOne' ? 'rgba(0, 227, 180)' : '' }}
      >
        <Icon icon='icon-park:move-one' style={{ fontSize: '15px' }} />
      </div>
      <div
        className={styles.options}
        onClick={() => {
          annotationDispatcher?.undo();
          setSelectedOptions('undo');
        }}
        style={{ backgroundColor: selectedOptions == 'undo' ? 'rgba(0, 227, 180)' : '' }}
      >
        <Icon icon='mdi:undo-variant' style={{ fontSize: '20px' }} />
      </div>
      <div
        className={styles.options}
        onClick={() => {
          annotationDispatcher?.redo();
          setSelectedOptions('redo');
        }}
        style={{ backgroundColor: selectedOptions == 'redo' ? 'rgba(0, 227, 180)' : '' }}
      >
        <Icon icon='mdi:redo-variant' style={{ fontSize: '20px' }} />
      </div>

      {allObjectVisibleToggle ? (
        <div
          className={styles.options}
          onClick={() => {
            setAllObjectVisibleToggle(false);
            setSelectedOptions('allObjectVisible');
            setAllInvisible();
          }}
          style={{
            backgroundColor: selectedOptions == 'allObjectVisible' ? 'rgba(0, 227, 180)' : ''
          }}
        >
          <Icon icon={eyeIcon} style={{ fontSize: '20px' }} />
        </div>
      ) : (
        <div
          className={styles.options}
          onClick={() => {
            setAllObjectVisibleToggle(true);
            setSelectedOptions('allObjectUnvisible');
            setAllVisible();
          }}
          style={{
            backgroundColor: selectedOptions == 'allObjectUnvisible' ? 'rgba(0, 227, 180)' : ''
          }}
        >
          <Icon icon={eyeSlashed} style={{ fontSize: '20px' }} />
        </div>
      )}
    </div>
  );
}
