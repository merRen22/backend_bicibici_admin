
import React from "react";
import ManagerNavbar from "../components/NavBars/managerNavBar.jsx";

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