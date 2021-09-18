import React from 'react'
import { NotificationsProvider } from '@mantine/notifications'
import './styles/style.scss'
import { Switch, Route } from 'react-router-dom'
import DefaultLayout from 'imports/ui/layout/DefaultLayout'
import Home from 'imports/ui/component/home/Index'
import LabelingPage from 'imports/ui/component/home/OptionPage/LabelingPage/LabelingPage'
import { OptionPage } from 'imports/ui/component/home/OptionPage/DataManagement/OptionPage'
// import OptionPage from "imports/ui/component/home/OptionPage/DataManagement_new/OptionPage";
import AccountPage from 'imports/ui/component/home/AccountPage/AccountPage'
import ProjectList2 from 'imports/ui/component/home/OptionPage/DataManagement/projectList2/ProjectList2'
import ProjectUpload from 'imports/ui/component/home/OptionPage/DataManagement/projectUpload/ProjectUpload'

import NotFound from 'imports/ui/component/home/NotFound'

const App = () => {
  return (
    <NotificationsProvider>
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
    </NotificationsProvider>
  )
}

export default App
