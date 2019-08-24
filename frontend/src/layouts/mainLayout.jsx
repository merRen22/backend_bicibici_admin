
import React from "react";
import { Route   } from "react-router-dom";

// core components
import MainNavbar from "../components/NavBars/mainNavBar.jsx";

var ps;

function MainLayout(props) {
  // const children = props.children;

  return (    
    <React.Fragment>
      <MainNavbar />
      <br/>
      <br/>
      {props.children}
    </React.Fragment>
  );
}

export default MainLayout;