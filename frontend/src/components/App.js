import React from "react";
import {  BrowserRouter,Switch, Route  } from "react-router-dom";

import MainLayout from "../layouts/mainLayout";
import ManagerLayout from "../layouts/mainLayout";
import AdminLayout from "../layouts/mainLayout";

import Login from "../pages/loginScreen";

import PanelStationContainer from "../pages/Manager/panelStationContainer";

function App(){
  return (<BrowserRouter>
  <Switch>
    <Route exact path={["/panelStations","/panelBikes"]}>
      <MainLayout>
        <Route path="/panelBikes" component={PanelStationContainer} />
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
