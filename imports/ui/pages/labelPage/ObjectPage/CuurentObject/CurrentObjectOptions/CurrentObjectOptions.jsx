import { Icon } from '@iconify/react';
import { Chip, Chips } from '@mantine/core';
import { selectionIdx } from 'imports/recoil/annotation';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { EditorMode } from 'ui/pages/labelPage/Editor';

import styles from './CurrentObjectOptions.module.css';

export default function CurrentObjectOptions({ currentProjectInfo, mode, setMode }) {
  const selection = useRecoilValue(selectionIdx);
  return (
    <div className={styles.currentObjectOptionsWrap}>
      <Chips color="teal" variant="filled">
        {currentProjectInfo !== null && currentProjectInfo.bbox.length > 0 ? (
          <Chip value={EditorMode.Rect}>
            <Icon
              icon="bi:bounding-box-circles"
              style={{
                width: '25px',
                height: '25px',
                color: mode === EditorMode.Rect ? 'rgba(0, 227, 180)' : '#000000',
              }}
              onClick={() => {
                if (selection !== undefined) setMode(EditorMode.Rect);
              }}
            />
          </Chip>
        ) : (
          ''
        )}
        {currentProjectInfo !== null && currentProjectInfo.keypoint.length > 0 ? (
          <Chip value={EditorMode.Skeleton}>
            <Icon
              icon="mdi:source-branch-plus"
              style={{
                width: '25px',
                height: '25px',
                color: mode === EditorMode.Skeleton ? 'rgba(0, 227, 180)' : '#000000',
              }}
              onClick={() => {
                if (selection !== undefined) setMode(EditorMode.Skeleton);
              }}
            />
          </Chip>
        ) : (
          ''
        )}
        {currentProjectInfo !== null && currentProjectInfo.polygon === true ? (
          <Chip value={EditorMode.Polygon}>
            <Icon
              icon="bx:bx-shape-polygon"
              style={{
                width: '25px',
                height: '25px',
                color: mode === EditorMode.Polygon ? 'rgba(0, 227, 180)' : '#000000',
              }}
              onClick={() => {
                if (selection !== undefined) setMode(EditorMode.Polygon);
              }}
            />
          </Chip>
        ) : (
          ''
        )}
      </Chips>
    </div>
  );
}
