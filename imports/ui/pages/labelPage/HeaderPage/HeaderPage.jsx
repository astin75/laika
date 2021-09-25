import React, { useEffect, useState } from 'react';

import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import styles from './HeaderPage.module.css';

export default function HeaderPage({ currentProjectInfo }) {
  // console.log(currentProjectInfo);
  return (
    <div className={styles.header}>
      <div></div>
      {currentProjectInfo ? (
        <div className={styles.headerName}>프로젝트명 : {currentProjectInfo.projectName}</div>
      ) : (
        ''
      )}
      <NavigationBar />
    </div>
  );
}
