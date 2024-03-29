import './styles/style.scss';

import { useMediaQuery } from '@mantine/hooks';
import DefaultLayout from 'imports/ui/components/DefaultLayout/DefaultLayout';
import MinScreen from 'imports/ui/pages/MinScreen';
import ProjectList2 from 'imports/ui/pages/OptionPage/DataManagement/ProjectList2/ProjectList2';
import ProjectUpload from 'imports/ui/pages/OptionPage/DataManagement/ProjectUpload/ProjectUpload';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AccountPage from 'ui/pages/AccountPage/AccountPage';
import IndexPage from 'ui/pages/IndexPage';
import LabelingPage from 'ui/pages/labelPage/LabelingPage';
import NotFound from 'ui/pages/NotFound';
import { OptionPage } from 'ui/pages/OptionPage/DataManagement/OptionPage';
import UserControl from 'ui/pages/OptionPage/DataManagement/UserControl/UserControl';
import RoadMap from 'ui/pages/RoadMap/RoadMap';

const App = () => {
  const user = useTracker(() => Meteor.user());
  const underMinSize = useMediaQuery('(max-width: 1024px)');
  return (
    <RecoilRoot>
      {underMinSize ? (
        <MinScreen />
      ) : (
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
                <Route path="/userControlPage" component={UserControl} />
                <Route path="/RoadMap" component={RoadMap} />
              </Switch>
            </DefaultLayout>
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      )}
    </RecoilRoot>
  );
};

export default App;
