import React from 'react'
import { NotificationsProvider } from '@mantine/notifications'
import Route from './route'
import './assets/sass/style.scss'

export const App = () => {
  return (
    <>
      <NotificationsProvider>
        <Route />
      </NotificationsProvider>
    </>
  )
}
