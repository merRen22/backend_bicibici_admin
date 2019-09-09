
import React from "react";
import AdminNavbar from "../components/NavBars/adminNavBar.jsx";

function AdminLayout(props) {
  return (    
    <React.Fragment>
      <AdminNavbar />
      {props.children}
    </React.Fragment>
  );
}

export default AdminLayout;