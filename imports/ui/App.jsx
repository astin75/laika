import React from 'react'
import { NotificationsProvider } from '@mantine/notifications'
import './styles/style.scss'
import { Switch, Route } from 'react-router-dom'
import DefaultLayout from 'imports/ui/components/DefaultLayout'
import IndexPage from 'imports/ui/pages/IndexPage'
import LabelingPage from 'imports/ui/pages/OptionPage/LabelingPage/LabelingPage'
import { OptionPage } from 'imports/ui/pages/OptionPage/DataManagement/OptionPage'
// import OptionPage from "imports/ui/pages/OptionPage/DataManagement_new/OptionPage";
import AccountPage from 'imports/ui/pages/AccountPage/AccountPage'
import ProjectList2 from 'imports/ui/pages/OptionPage/DataManagement/projectList2/ProjectList2'
import ProjectUpload from 'imports/ui/pages/OptionPage/DataManagement/projectUpload/ProjectUpload'

import NotFound from 'imports/ui/pages/NotFound'

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
