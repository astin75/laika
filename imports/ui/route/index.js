import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import ScrollToTop from './ScrollToTop'

/*************
    LayOut
*************/

import DefaultLayout from '../layout/DefaultLayout'

/*************
     Home
*************/

import Home from '../component/home/Index'
import SubPage from '../component/home/SubPage'

/*************
     404
*************/

import NotFound from '../component/home/NotFound'

const Routes = ({ auth }) => {
  return (
    <Router
      history={history}
    >
      <ScrollToTop />
      <Switch>

        <Route exact path={[
          '/',
          '/subPage',
        ]}>

          <DefaultLayout>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/subPage' component={SubPage} />
            </Switch>
          </DefaultLayout>
        </Route>

        {/***********
            404
        ***********/}

        <Route path='*' component={NotFound} />

      </Switch>

    </Router>

  )
}

export default Routes
