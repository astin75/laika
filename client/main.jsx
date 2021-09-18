import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { App } from '../imports/ui/App'
import '@fortawesome/fontawesome-free/js/all.js'

Meteor.startup(() => {
  render(<App />, document.getElementById('app'))
})
