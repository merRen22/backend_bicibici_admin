import React from "react";
import {  BrowserRouter,Switch, Route  } from "react-router-dom";

import MainLayout from "../layouts/mainLayout";
import ManagerLayout from "../layouts/managerLayout";
import AdminLayout from "../layouts/mainLayout";

import Login from "../pages/loginScreen";


import PanelStationContainer from "../pages/Manager/stations/panelStationContainer";
import InfoStationContainer from "../pages/Manager/stations/editarStation";
import RegistrationStationContainer from "../pages/Manager/stations/registrarStation";

import PanelBikesContainer from "../pages/Manager/bikes/panelBikesContainer";
import InfoBikeContainer from "../pages/Manager/bikes/editarBike";
import RegistrationBikeContainer from "../pages/Manager/bikes/registrarBicicleta";

import PanelPlansContainer from "../pages/Manager/plans/panelPlansContainer";
import InfoPlanContainer from "../pages/Manager/plans/editarPlan";
import RegistrationPlanContainer from "../pages/Manager/plans/registrarPlan";

import PanelAccountsContainer from "../pages/Manager/account/panelAccountsContainer";
import InfoAccountContainer from "../pages/Manager/account/editarAccount";
import RegistrationAccountContainer from "../pages/Manager/account/registrarAccount";

import {PrivateRoute} from './privateRoute'

function App(){
  return (
  <BrowserRouter>
  <Switch>
    <Route path={[
      "/panelStations","/panelStationsInfo/:uuidStation","/panelStationsRegistration",
      "/panelBikes","/panelBikesInfo/:uuidBike","/panelBikesRegistration",
      "/panelPlans","/panelPlansInfo/:uuidPlan","/panelPlansRegistration",
      "/panelAccounts","/panelAccountsInfo/:uuidAccount","/panelAccountsRegistration",
      ]}>
      <ManagerLayout>
        <PrivateRoute path="/panelStationsInfo/:uuidStation" component={InfoStationContainer} />
        <PrivateRoute path="/panelStationsRegistration" component={RegistrationStationContainer} />
        <PrivateRoute path="/panelStations" component={PanelStationContainer} />

        <PrivateRoute path="/panelBikesInfo/:uuidBike" component={InfoBikeContainer} />
        <PrivateRoute path="/panelBikes" component={PanelBikesContainer} />
        <PrivateRoute path="/panelBikesRegistration" component={RegistrationBikeContainer} />

        <PrivateRoute path="/panelPlansInfo/:uuidPlan" component={InfoPlanContainer} />
        <PrivateRoute path="/panelPlans" component={PanelPlansContainer} />
        <PrivateRoute path="/panelPlansRegistration" component={RegistrationPlanContainer} />
        
        <PrivateRoute path="/panelAccountsInfo/:uuidAccount" component={InfoAccountContainer} />
        <PrivateRoute path="/panelAccounts" component={PanelAccountsContainer} />
        <PrivateRoute path="/panelAccountsRegistration" component={RegistrationAccountContainer} />
        
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
