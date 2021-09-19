import '@fortawesome/fontawesome-free/js/all.js'

import { NotificationsProvider } from '@mantine/notifications'
import { createBrowserHistory } from 'history'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import App from 'ui/App'

Meteor.startup(() => {
  const history = createBrowserHistory()

  render(
    <Router history={history}>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </Router>,
    document.getElementById('app')
  )
})
