import { Button } from '@mantine/core';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import styles from './SmallNavigation.module.css';
import { userProfileCollection } from "imports/db";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export default function SmallNavigation() {
  const user = useTracker(() => Meteor.user());
  const [IsThereAdmin, setIsThereAdmin] = useState(false);

  useEffect(() => {

    setIsThereAdmin(false)
    if (user){
      let userProfile = userProfileCollection.findOne({ userName: user.username});
      if (userProfile)
      {
        if (userProfile.rank === 'admin'){
          setIsThereAdmin(true)
        }
      }
    }

  }, [user])

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
      {IsThereAdmin && (
        <>
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
        </>
        )

      }

    </div>
  );
}
