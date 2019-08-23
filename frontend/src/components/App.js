import React from "react";
import { BrowserRouter,Switch, Route } from "react-router-dom";


import MainLayout from "../layouts/mainLayout";
import ManagerLayout from "../layouts/mainLayout";
import AdminLayout from "../layouts/mainLayout";

import Login from "../pages/loginScreen";

import PanelStations from "../pages/Manager/panelStations.jsx";


const AppRoute = ({ component: Component, layout: Layout}) => (
  <Route render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

/*
import Layout from './Layout';

import Badges from '../pages/Badges';
import BadgeNew from '../pages/BadgeNew';
import BadgeDetails from '../pages/BadgeDetails';
import BadgeEdit from '../pages/BadgeEdit';
import NotFound from '../pages/NotFound';
*/
referenica
https://gist.github.com/avinmathew/e82fe7e757b20cb337d5219e0ab8dc2c

function App() {
  return (

    <BrowserRouter>
  <div>
    <Switch>
        <AppRoute path="/" layout={MainLayout} component={Login} />
  </Switch>
  </div>
  </BrowserRouter>
  );
}

/*


        <AppRoute path="/" layout={MainLayout} component={Login} />

*/

/*

          <Route exact path="/badges" component={Badges} />
          <Route exact path="/badges/new" component={BadgeNew} />
          <Route exact path="/badges/:badgeId" component={BadgeDetails} />
          <Route exact path="/badges/:badgeId/edit" component={BadgeEdit} />
          <Route component={NotFound} />
*/

export default App;
