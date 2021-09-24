import styles from './HeaderPage.module.css';
import React, { useEffect, useState } from 'react';

import NavigationBar from '../../../components/NavigationBar/NavigationBar';

export default function HeaderPage({ currentProjectInfo }) {
  // console.log(currentProjectInfo);
  return (
    <div className={styles.header}>
      <div></div>
      <div className={styles.headerName}>{currentProjectInfo.projectName}</div>
      <NavigationBar />
    </div>
  );
}
