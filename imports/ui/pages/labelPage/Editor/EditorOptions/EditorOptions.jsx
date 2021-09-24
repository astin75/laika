import React, { useEffect, useState } from 'react';
import styles from './EditorOptions.module.css';
// import { Table } from '@mantine/core';

export default function EditorOptions() {
  return (
    <div className={styles.pageWrap}>
      <div className={styles.options}>
        <i className="fas  fa-search-plus"></i>
      </div>
      <div className={styles.options}>
        <i className="fas fa-search-minus"></i>
      </div>
      <div className={styles.options}>
        <i className="fas fa-hand-paper"></i>
      </div>
    </div>
  );
}
