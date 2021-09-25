import { Icon } from '@iconify/react';
import { Chip, Chips } from '@mantine/core';
import React, { useState } from 'react';

import styles from './CurrentObjectOptions.module.css';

export default function CurrentObjectOptions({ currentProjectInfo }) {
  const [currentDrawOption, setCurrentDrawOption] = useState('');
  // if (currentProjectInfo !== null)
  //   console.log("test", currentProjectInfo.polygon);

  return (
    <div className={styles.currentObjectOptionsWrap}>
      <Chips value={'bBox'}>
        {currentProjectInfo !== null && currentProjectInfo.bbox.length > 0 ? (
          <Chip value={'bBox'}>
            <Icon
              icon="akar-icons:square"
              style={{
                width: '400px',
                height: '400px',
                color: currentDrawOption === 'bBox' ? '#000000' : '#ffffff',
              }}
              onClick={() => {
                setCurrentDrawOption('bBox');
              }}
            />
          </Chip>
        ) : (
          ''
        )}
        {currentProjectInfo !== null && currentProjectInfo.keypoint.length > 0 ? (
          <Chip value={'ketPoint'}>
            <Icon
              icon="akar-icons:dot-grid"
              style={{
                width: '20px',
                height: '20px',
                color: currentDrawOption === 'ketPoint' ? '#000000' : '#ffffff',
              }}
              onClick={() => {
                setCurrentDrawOption('ketPoint');
              }}
            />
          </Chip>
        ) : (
          ''
        )}
        {currentProjectInfo !== null && currentProjectInfo.polygon === 'true' ? (
          <Chip value={'polygon'}>
            <Icon
              icon="bx:bx-shape-polygon"
              style={{
                width: '20px',
                height: '20px',
                color: currentDrawOption === 'polygon' ? '#000000' : '#ffffff',
              }}
              onClick={() => {
                setCurrentDrawOption('polygon');
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
