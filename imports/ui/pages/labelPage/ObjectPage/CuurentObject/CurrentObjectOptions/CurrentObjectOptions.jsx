import { Icon } from '@iconify/react';
import styles from './CurrentObjectOptions.module.css';
import React, { useState } from 'react';
import { EditorMode } from 'ui/pages/labelPage/Editor';
import { useRecoilValue } from 'recoil';
import { selectionIdx } from 'imports/recoil/annotation';

export default function CurrentObjectOptions({ currentProjectInfo, mode, setMode }) {
  const selection = useRecoilValue(selectionIdx);
  return (
    <div className={styles.currentObjectOptionsWrap}>
      {currentProjectInfo !== null && currentProjectInfo.bbox.length > 0 ? (
        <Icon
          icon='bi:bounding-box-circles'
          style={{
            width: '20px',
            height: '20px',
            color: mode === EditorMode.Rect ? 'rgba(0, 227, 180)' : '#000000'
          }}
          onClick={() => {
            if (selection !== undefined)
              setMode(EditorMode.Rect);
          }}
        />
      ) : (
        ''
      )}
      {currentProjectInfo !== null && currentProjectInfo.keypoint.length > 0 ? (
        <Icon
          icon='mdi:source-branch-plus'
          style={{
            width: '20px',
            height: '20px',
            color: mode === EditorMode.Skeleton ? 'rgba(0, 227, 180)' : '#000000'
          }}
          onClick={() => {
            if (selection !== undefined)
              setMode(EditorMode.Skeleton);
          }}
        />
      ) : (
        ''
      )}
      {currentProjectInfo !== null && currentProjectInfo.polygon === true ? (
        <Icon
          icon='bx:bx-shape-polygon'
          style={{
            width: '20px',
            height: '20px',
            color: mode === EditorMode.Polygon ? 'rgba(0, 227, 180)' : '#000000'
          }}
          onClick={() => {
            if (selection !== undefined)
              setMode(EditorMode.Polygon);
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}
