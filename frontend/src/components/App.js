import React from "react";
import {  BrowserRouter,Switch, Route  } from "react-router-dom";

import MainLayout from "../layouts/mainLayout";
import ManagerLayout from "../layouts/mainLayout";
import AdminLayout from "../layouts/mainLayout";

import Login from "../pages/loginScreen";

import PanelStations from "../pages/Manager/panelStationContainer";

function App(){
  return (<BrowserRouter>
  <Switch>
    <Route exact path={["/panelStations","/panelBikes"]}>
      <MainLayout>
        <Route path="/panelBikes" component={Login} />
        <Route path="/panelStations" component={PanelStations} />
      </MainLayout>
    </Route>
    <Route exact path={["/"]}>
      <MainLayout>
        <Route exact path="/" component={Login} />
      </MainLayout>
    </Route>
  </Switch>
  </BrowserRouter>
  );
}

export default App;
