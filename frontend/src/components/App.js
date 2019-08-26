import React from "react";
import {  BrowserRouter,Switch, Route  } from "react-router-dom";

import MainLayout from "../layouts/mainLayout";
import ManagerLayout from "../layouts/managerLayout";
import AdminLayout from "../layouts/mainLayout";

import Login from "../pages/loginScreen";

import PanelStationContainer from "../pages/Manager/panelStationContainer";
import PanelBikesContainer from "../pages/Manager/panelStationContainer";
import PanelUsersContainer from "../pages/Manager/panelStationContainer";
import PanelPlansContainer from "../pages/Manager/panelStationContainer";

import InfoStationContainer from "../pages/Manager/editarStation";
import RegistrationStationContainer from "../pages/Manager/registrarStation";

function App(){
  return (
  <BrowserRouter>
  <Switch>
    <Route path={["/panelStations","/panelStationsInfo/:stationID","/panelStationsRegistration","/panelBikes"]}>
      <ManagerLayout>
        <Route path="/panelStationsInfo/:stationID" component={InfoStationContainer} />
        <Route path="/panelStationsRegistration" component={RegistrationStationContainer} />
        <Route path="/panelStations" component={PanelStationContainer} />
        <Route path="/panelBikes" component={PanelBikesContainer} />
        <Route path="/panelUsers" component={PanelUsersContainer} />
        <Route path="/panelPlans" component={PanelPlansContainer} />
      </ManagerLayout>
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
