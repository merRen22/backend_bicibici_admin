
import React from "react";
import { Route, Switch } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import ManagerNavbar from "../components/NavBars/managerNavBar.jsx";

var ps;

function ManagerLayout(props) {
  // const children = props.children;

  return (    
    <React.Fragment>
      <ManagerNavbar />
      <br/>
      <br/>
      {props.children}
    </React.Fragment>
  );
}

export default ManagerLayout;