import { Icon } from '@iconify/react';
import { ActionIcon } from '@mantine/core';
import { selectionIdx } from 'imports/recoil/annotation';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { EditorMode } from 'ui/pages/labelPage/Editor';

import styles from './CurrentObjectOptions.module.css';

export default function CurrentObjectOptions({ currentProjectInfo, mode, setMode }) {
  const selection = useRecoilValue(selectionIdx);
  return (
    <div className={styles.currentObjectOptionsWrap}>

        {currentProjectInfo !== null && currentProjectInfo.bbox.length > 0 ? (
        <ActionIcon variant={  mode === EditorMode.Rect ? 'outline' : false}>
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
        </ActionIcon>

        ) : (
          ''
        )}
        {currentProjectInfo !== null && currentProjectInfo.keypoint.length > 0 ? (
          <ActionIcon variant={  mode === EditorMode.Skeleton ? 'outline' : false}>
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
          </ActionIcon>

        ) : (
          ''
        )}
        {currentProjectInfo !== null && currentProjectInfo.bbox.length > 0 ? (
          <ActionIcon variant={  mode === EditorMode.Polygon ? 'outline' : false}>
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
          </ActionIcon>

        ) : (
          ''
        )}

    </div>
  );
}
