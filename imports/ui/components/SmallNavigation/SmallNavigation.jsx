import { Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './SmallNavigation.module.css';

export default function SmallNavigation() {
  return (
    <div className={styles.topMenu}>
      <Button
        className={styles.topMenuButton}
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
        component={Link}
        to="/projectListPage"
      >
        프로젝트 리스트
      </Button>
      <Button
        className={styles.topMenuButton}
        variant="gradient"
        gradient={{ from: 'teal', to: 'green', deg: 70 }}
        component={Link}
        to="/projectManagementPage"
      >
        프로젝트 등록
      </Button>
      <Button
        className={styles.topMenuButton}
        variant="gradient"
        gradient={{ from: 'orange', to: 'pink', deg: 35 }}
        component={Link}
        to="/userControlPage"
      >
        계정 관리
      </Button>
    </div>
  );
}
