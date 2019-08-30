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
import RegistrationBikeContainer from "../pages/Manager/bikes/registrarBicicleta";

import PanelPlansContainer from "../pages/Manager/plans/panelPlansContainer";
import InfoPlanContainer from "../pages/Manager/plans/editarPlan";
import RegistrationPlanContainer from "../pages/Manager/plans/registrarPlan";

function App(){
  return (
  <BrowserRouter>
  <Switch>
    <Route path={[
      "/panelStations","/panelStationsInfo/:uuidStation","/panelStationsRegistration",
      "/panelBikes","/panelBikesInfo/:uuidBike","/panelBikesRegistration",
      "/panelPlans","/panelPlansInfo/:uuidPlan","/panelPlansRegistration",
      "/panelAccounts","/panelBikesInfo/:uuidAccount","/panelAccountsRegistration",
      ]}>
      <ManagerLayout>
        <Route path="/panelStationsInfo/:uuidStation" component={InfoStationContainer} />
        <Route path="/panelStationsRegistration" component={RegistrationStationContainer} />
        <Route path="/panelStations" component={PanelStationContainer} />

        <Route path="/panelBikes" component={PanelBikesContainer} />
        <Route path="/panelBikesRegistration" component={RegistrationBikeContainer} />

        <Route path="/panelPlansInfo/:uuidPlan" component={InfoPlanContainer} />
        <Route path="/panelPlans" component={PanelPlansContainer} />
        <Route path="/panelPlansRegistration" component={RegistrationPlanContainer} />
        

        <Route path="/panelUsers" component={PanelStationContainer} />
        
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
