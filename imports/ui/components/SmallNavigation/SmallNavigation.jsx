import React from 'react';
import styles from './SmallNavigation.module.css'
import {Button} from "@mantine/core";
import {Link} from "react-router-dom";

export default function () {
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
                gradient={{ from: 'grape', to: 'pink', deg: 35 }}
                component={Link}
                to="/userControlPage"
            >
                계정 관리
            </Button>
        </div>
    );
};