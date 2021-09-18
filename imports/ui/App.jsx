import React from 'react'
import { NotificationsProvider } from '@mantine/notifications'
import './styles/style.scss'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

export const App = () => {
  const history = createBrowserHistory()

  return (
    <NotificationsProvider>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={[
              '/',
              '/labelingPage',
              '/optionPage',
              '/accountPage',
              '/projectListPage',
              '/projectManagementPage',
            ]}
          >
            <DefaultLayout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/labelingPage" component={LabelingPage} />
                <Route exact path="/optionPage" component={OptionPage} />
                <Route exact path="/accountPage" component={AccountPage} />
                <Route exact path="/projectListPage" component={ProjectList2} />
                <Route exact path="/projectManagementPage" component={ProjectUpload} />
              </Switch>
            </DefaultLayout>
          </Route>

          {/***********
            404
        ***********/}

          <Route path="*" component={NotFound} />
        </Switch>

        <Route />
      </Router>
    </NotificationsProvider>
  )
}
