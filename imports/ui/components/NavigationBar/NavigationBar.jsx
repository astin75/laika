import React from 'react'
import styles from './NavigationBar.module.css'
import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'
import { Meteor } from 'meteor/meteor'

export default function NavigationBar() {
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
          to="/projectListPage"
          size={'compact-xs'}
          radius={10}
          styles={buttonStyles}
          leftIcon={<i className="fas fa-door-open"></i>}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 20 }}
        >
          Logout
        </Button>
        <Button
          className={styles.linkStyles}
          component={Link}
          to="/accountPage"
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
