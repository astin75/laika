import { Icon } from '@iconify/react';
import styles from './CurrentObjectOptions.module.css';
import React, { useState } from 'react';

export default function CurrentObjectOptions({ currentProjectInfo }) {
  // 현재 선택된 Draw 옵션
  const [currentDrawOption, setCurrentDrawOption] = useState('');

  return (
    <div className={styles.currentObjectOptionsWrap}>
      {currentProjectInfo !== null && currentProjectInfo.bbox.length > 0 ? (
        <Icon
          icon="bi:bounding-box-circles"
          style={{
            width: '20px',
            height: '20px',
            color: currentDrawOption === 'bBox' ? 'rgba(0, 227, 180)' : '#000000',
          }}
          onClick={() => {
            setCurrentDrawOption('bBox');
          }}
        />
      ) : (
        ''
      )}
      {currentProjectInfo !== null && currentProjectInfo.keypoint.length > 0 ? (
        <Icon
          icon="mdi:source-branch-plus"
          style={{
            width: '20px',
            height: '20px',
            color: currentDrawOption === 'ketPoint' ? 'rgba(0, 227, 180)' : '#000000',
          }}
          onClick={() => {
            setCurrentDrawOption('ketPoint');
          }}
        />
      ) : (
        ''
      )}
      {currentProjectInfo !== null && currentProjectInfo.polygon === true ? (
        <Icon
          icon="bx:bx-shape-polygon"
          style={{
            width: '20px',
            height: '20px',
            color: currentDrawOption === 'polygon' ? 'rgba(0, 227, 180)' : '#000000',
          }}
          onClick={() => {
            setCurrentDrawOption('polygon');
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}
