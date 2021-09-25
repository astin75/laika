import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import styles from './EditorOptions.module.css';
import { useRecoilValue } from 'recoil';
import { canvasViewDispatcherState } from 'imports/recoil/canvas';
import { annotationDispatcherState } from 'imports/recoil/annotation';
import { EditorMode } from 'ui/pages/labelPage/Editor';

import eyeIcon from '@iconify/icons-akar-icons/eye';
import eyeSlashed from '@iconify/icons-akar-icons/eye-slashed';
// import { Table } from '@mantine/core';

export default function EditorOptions({ mode, setMode }) {
  const canvasViewDispatcher = useRecoilValue(canvasViewDispatcherState);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);

  const [allObjectVisibleToggle, setAllObjectVisibleToggle] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState('');
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
        <i className="fas  fa-search-plus" style={{ fontSize: '15px' }} />
      </div>
      <div
        className={styles.options}
        onClick={() => {
          canvasViewDispatcher?.zoomCanvas(-1);
          setSelectedOptions('searchMinus');
        }}
        style={{ backgroundColor: selectedOptions == 'searchMinus' ? 'rgba(0, 227, 180)' : '' }}
      >
        <i className="fas fa-search-minus" style={{ fontSize: '15px' }} />
      </div>
      <div
        className={styles.options}
        onClick={() => {
          setMode(EditorMode.Idle);
          setSelectedOptions('moveOne');
        }}
        style={{ backgroundColor: selectedOptions == 'moveOne' ? 'rgba(0, 227, 180)' : '' }}
      >
        <Icon icon="icon-park:move-one" style={{ fontSize: '15px' }} />
      </div>
      <div
        className={styles.options}
        onClick={() => {
          annotationDispatcher?.undo();
          setSelectedOptions('undo');
        }}
        style={{ backgroundColor: selectedOptions == 'undo' ? 'rgba(0, 227, 180)' : '' }}
      >
        <Icon icon="mdi:undo-variant" style={{ fontSize: '20px' }} />
      </div>
      <div
        className={styles.options}
        onClick={() => {
          annotationDispatcher?.redo();
          setSelectedOptions('redo');
        }}
        style={{ backgroundColor: selectedOptions == 'redo' ? 'rgba(0, 227, 180)' : '' }}
      >
        <Icon icon="mdi:redo-variant" style={{ fontSize: '20px' }} />
      </div>

      {allObjectVisibleToggle ? (
        <div
          className={styles.options}
          onClick={() => {
            setAllObjectVisibleToggle(false);
            setSelectedOptions('allObjectVisible');
          }}
          style={{
            backgroundColor: selectedOptions == 'allObjectVisible' ? 'rgba(0, 227, 180)' : '',
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
          }}
          style={{
            backgroundColor: selectedOptions == 'allObjectUnvisible' ? 'rgba(0, 227, 180)' : '',
          }}
        >
          <Icon icon={eyeSlashed} style={{ fontSize: '20px' }} />
        </div>
      )}
    </div>
  );
}
