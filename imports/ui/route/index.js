import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import ScrollToTop from "./ScrollToTop";

/*************
    LayOut
*************/

import DefaultLayout from "../layout/DefaultLayout";

/*************
     Home
*************/

import Home from "../component/home/Index";
import LabelingPage from "../component/home/OptionPage/LabelingPage/LabelingPage";
import { OptionPage } from "../component/home/OptionPage/DataManagement/OptionPage";
//import OptionPage from "../component/home/OptionPage/DataManagement_new/OptionPage";
import AccountPage from "../component/home/AccountPage/AccountPage";

/*************
     404
*************/

import NotFound from "../component/home/NotFound";

const Routes = ({ auth }) => {
  return (
    <Router history={history}>
      <ScrollToTop />
      <Switch>
        <Route
          exact
          path={["/", "/labelingPage", "/optionPage", "/accountPage"]}
        >
          <DefaultLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/labelingPage" component={LabelingPage} />
              <Route exact path="/optionPage" component={OptionPage} />
              <Route exact path="/accountPage" component={AccountPage} />
            </Switch>
          </DefaultLayout>
        </Route>

        {/***********
            404
        ***********/}

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
