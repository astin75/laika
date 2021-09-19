import './styles/style.scss'

import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DefaultLayout from 'ui/components/DefaultLayout'
// import OptionPage from "imports/ui/pages/OptionPage/DataManagement_new/OptionPage";
import AccountPage from 'ui/pages/AccountPage/AccountPage'
import IndexPage from 'ui/pages/IndexPage'
import NotFound from 'ui/pages/NotFound'
import { OptionPage } from 'ui/pages/OptionPage/DataManagement/OptionPage'
import ProjectList2 from 'ui/pages/OptionPage/DataManagement/projectList2/ProjectList2'
import ProjectUpload from 'ui/pages/OptionPage/DataManagement/projectUpload/ProjectUpload'
import LabelingPage from 'ui/pages/OptionPage/LabelingPage/LabelingPage'

const App = () => {
  return (
    <NotificationsProvider>
      <Switch>
        <Route>
          <DefaultLayout>
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <Route path="/labelingPage" component={LabelingPage} />
              <Route path="/optionPage" component={OptionPage} />
              <Route path="/accountPage" component={AccountPage} />
              <Route path="/projectListPage" component={ProjectList2} />
              <Route path="/projectManagementPage" component={ProjectUpload} />
            </Switch>
          </DefaultLayout>
        </Route>

        {/***********
            404
        ***********/}

        <Route path="*" component={NotFound} />
      </Switch>
    </NotificationsProvider>
  )
}

export default App
