import { useNotifications } from '@mantine/notifications'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import NavigationBar from '../../components/NavigationBar/NavigationBar'
import styles from './AccountPage.module.css'
import LoginPage from './LoginPage/LoginPage'
import SignUpPage from './SignUpPage/SignUpPage'

export default function AccountPage() {
  const user = useTracker(() => Meteor.user())
  const logout = () => Meteor.logout()

  const [isThereAccount, setIsThereAccount] = useState(true)

  const notifications = useNotifications()
  const showNotification = () =>
    notifications.showNotification({
      title: '',
      message: '안녕하세요.! 라이카에 오신걸 환영합니다.! 🤥',
    })

  useEffect(() => {
    showNotification()
  }, [])

  return (
    <div className={styles.main}>
      <div>
        {isThereAccount ? (
          <LoginPage setIsThereAccount={setIsThereAccount} />
        ) : (
          <SignUpPage setIsThereAccount={setIsThereAccount} />
        )}
      </div>
      <NavigationBar />
    </div>
  )
}
