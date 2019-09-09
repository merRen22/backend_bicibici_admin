import React from "react";
import classNames from "classnames";
import { Link,Redirect } from 'react-router-dom';

import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toLogin:false,
      color: "primary"
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  
  logout = e =>  {
    localStorage.removeItem('user');
    this.setState({
      toLogin:true
    });
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };

  render() {

    if(this.state.toLogin === true) {
      return <Redirect to='/'/>
    }

    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
          color={this.state.color}
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
              </div>
              <NavbarBrand>
                <h1 className="h1 h1_white_title">bicibici</h1>
              </NavbarBrand>

            </div>
          </Container>

          <Link
            className={"mr-4"}
            to={'/HomeAdmin'}
          >

            <h3 className="h3 h3_white_title">Mapa</h3>
          </Link>
          <Link
            className={"mr-4"}
            to={'/ReportAdmin'}
          >

            <h3 className="h3 h3_white_title">Reportes</h3>
          </Link>
          
          <button
          onClick = {this.logout}
            className={"btn transparent"}
          >
            <h3 className="h3 h3_white_title">cerrar sesión</h3>
          </button>
        </Navbar>
      </>
    );
  }
}
export default AdminNavbar;