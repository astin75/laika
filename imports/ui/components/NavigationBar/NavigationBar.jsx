import { Button } from '@mantine/core'
import { Meteor } from 'meteor/meteor'
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import styles from './NavigationBar.module.css'
import { useTracker } from "meteor/react-meteor-data";
import { userProfileCollection } from "imports/db";

export default function NavigationBar() {
  const user = useTracker(() => Meteor.user());
  const [IsThereId, setIsThereId] = useState('LogIn');

  useEffect(() => {

    setIsThereId('LogIn')
    if (user){
      setIsThereId(user.username)

    }

  }, [user])


  const buttonStyles = { root: { marginRight: 12 } }
  const logout = () => Meteor.logout()
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Button
          className={styles.linkStyles}
          component={Link}
          to="/"
          size={'compact-xs'}
          radius={10}
          styles={buttonStyles}
          leftIcon={<i className="fas fa-home"></i>}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 80 }}
        >
          Home
        </Button>
        <Button
          className={styles.linkStyles}
          component={Link}
          onClick={logout}
          to="/accountPage"
          size={'compact-xs'}
          radius={10}
          styles={buttonStyles}
          leftIcon={<i className="fas fa-door-open"></i>}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 20 }}
        >
          {IsThereId}
        </Button>
        <Button
          className={styles.linkStyles}
          component={Link}
          to="/projectListPage"
          size={'compact-xs'}
          radius={10}
          styles={buttonStyles}
          leftIcon={<i className="far fa-file-powerpoint"></i>}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          project
        </Button>
      </div>
    </React.Fragment>
  )
}
