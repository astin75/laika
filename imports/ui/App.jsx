import './styles/style.scss'

import { Overlay } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import DefaultLayout from 'imports/ui/components/DefaultLayout/DefaultLayout'
import MinScreen from 'imports/ui/pages/MinScreen'
import React, { createContext, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
// import OptionPage from "imports/ui/pages/OptionPage/DataManagement_new/OptionPage";
import AccountPage from 'ui/pages/AccountPage/AccountPage'
import IndexPage from 'ui/pages/IndexPage'
import NotFound from 'ui/pages/NotFound'
import { OptionPage } from 'ui/pages/OptionPage/DataManagement/OptionPage'
import ProjectList2 from 'ui/pages/OptionPage/DataManagement/projectList2/ProjectList2'
import ProjectUpload from 'ui/pages/OptionPage/DataManagement/projectUpload/ProjectUpload'
import LabelingPage from 'ui/pages/OptionPage/LabelingPage/LabelingPage'

export const OverlayContext = createContext(true)

const App = () => {
  const underMinSize = useMediaQuery('(max-width: 1024px)')
  const isOverlay = useContext(OverlayContext)
  return underMinSize ? (
    <MinScreen />
  ) : (
    <OverlayContext.Provider value={false}>
      {isOverlay && <Overlay opacity={0.6} color="#000" zIndex={5} />}
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
        <Route path="*" component={NotFound} />
      </Switch>
    </OverlayContext.Provider>
  )
}

export default App
