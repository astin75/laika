import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import styles from './EditorOptions.module.css';
import { useRecoilValue } from 'recoil';
import { canvasViewDispatcherState } from 'imports/recoil/canvas';
import { annotationDispatcherState } from 'imports/recoil/annotation';
import { EditorMode } from 'ui/pages/labelPage/Editor';
// import { Table } from '@mantine/core';

export default function EditorOptions({ mode, setMode }) {
  const canvasViewDispatcher = useRecoilValue(canvasViewDispatcherState);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);

  return (
    <div className={styles.pageWrap}>
      <div className={styles.options} onClick={() => {
        canvasViewDispatcher?.zoomCanvas(1);
      }}>
        <i className='fas  fa-search-plus' style={{ fontSize: '15px' }} />
      </div>
      <div className={styles.options} onClick={() => {
        canvasViewDispatcher?.zoomCanvas(-1);
      }}>
        <i className='fas fa-search-minus' style={{ fontSize: '15px' }} />
      </div>
      <div className={styles.options} onClick={() => {
        setMode(EditorMode.Idle)
      }}>
        <Icon icon='icon-park:move-one' style={{ fontSize: '15px' }} />
      </div>
      <div className={styles.options} onClick={()=>{
        annotationDispatcher?.undo()
      }}>
        <Icon icon='mdi:undo-variant' style={{ fontSize: '20px' }} />
      </div>
      <div className={styles.options} onClick={() => {
        annotationDispatcher?.redo()
      }}>
        <Icon icon='mdi:redo-variant' style={{ fontSize: '20px' }} />
      </div>
    </div>
  );
}
