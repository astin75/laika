import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import styles from './EditorOptions.module.css';
// import { Table } from '@mantine/core';

export default function EditorOptions() {
  return (
    <div className={styles.pageWrap}>
      <div className={styles.options}>
        <i className="fas  fa-search-plus" style={{ fontSize: '15px' }}></i>
      </div>
      <div className={styles.options}>
        <i className="fas fa-search-minus" style={{ fontSize: '15px' }}></i>
      </div>
      <div className={styles.options}>
        <Icon icon="icon-park:move-one" style={{ fontSize: '15px' }} />
      </div>
      <div className={styles.options}>
        <Icon icon="mdi:undo-variant" style={{ fontSize: '20px' }} />
      </div>
      <div className={styles.options}>
        <Icon icon="mdi:redo-variant" style={{ fontSize: '20px' }} />
      </div>
    </div>
  );
}
