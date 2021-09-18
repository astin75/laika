import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import App from 'imports/ui/App'
import '@fortawesome/fontawesome-free/js/all.js'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

Meteor.startup(() => {
  const history = createBrowserHistory()

  render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('app')
  )
})
