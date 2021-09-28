import React, { useState } from 'react';

import styles from './KeypointList.module.css';
import { Select, ColorPicker } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { annotationDispatcherState, currentAnnotations, keypointIdx, selectionIdx } from 'imports/recoil/annotation';
import _ from 'lodash';
import { keypointColors } from 'imports/canvasTools/ISkeleton';
//


export default function KeypointList({ currentProjectInfo }) {
  const keypointClassList = ['안보임', '가려짐', '보임'];
  const keypointArr = currentProjectInfo.keypoint;
  const annotations = useRecoilValue(currentAnnotations);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const [selection, setSelection] = useRecoilState(selectionIdx);
  const [curKeypoint, setCurKeypoint] = useRecoilState(keypointIdx);

  const getSelectValue = (idx) => {
    switch (annotations[selection].regions.keypoint.points[idx].visible) {
      case 0:
        return '안보임';
      case 1:
        return '가려짐';
      case 2:
        return '보임';
    }
  };

  const onChange = (e, idx) => {
    const newAnnot = _.cloneDeep(annotations[selection]);
    switch (e) {
      case '안보임':
        newAnnot.regions.keypoint.points[idx].visible = 0;
        break;
      case '가려짐':
        newAnnot.regions.keypoint.points[idx].visible = 1;
        break;
      case '보임':
        newAnnot.regions.keypoint.points[idx].visible = 2;
        break;
    }
    annotationDispatcher?.edit(selection, newAnnot, false);
  };

  const setInvisible = (idx) => {
    const newAnnot = _.cloneDeep(annotations[selection]);
    newAnnot.regions.keypoint.points[idx].visible = 0;
    annotationDispatcher?.edit(selection, newAnnot, false);
  };

  const getMarkerColor = (idx) => {
    if (selection === undefined)
      return;
    const currentAnnot = annotations[selection];
    if (currentAnnot.regions.keypoint?.points[idx].visible === 2)
      return keypointColors[idx];
    else if (currentAnnot.regions.keypoint?.points[idx].visible === 1)
      return '#000000';
    else
      return '#ffffff';
  };

  return (
    <div className={styles.listWrap}>
      {keypointArr.map((e, idx) => (
        <div key={e} className={styles.list} onClick={() => setCurKeypoint(idx)}>
          <div style={{ color: getMarkerColor(idx) }}>
            <i className='fas fa-map-marker-alt'></i>
          </div>
          <div className={styles.listTitle}>{e}</div>

          <div className={styles.listOptionList}>
            <div onClick={() => setInvisible(idx)}>
              <i className='fas fa-trash-alt' />
            </div>

            <Select
              size='xs'
              data={keypointClassList}
              value={getSelectValue(idx)}
              onChange={(e) => {
                onChange(e, idx);
              }}
              style={{ width: '80px' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
