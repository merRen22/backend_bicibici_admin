import React from "react";
import classNames from "classnames";
import { Link } from 'react-router-dom';

import {
  NavbarBrand,
  Navbar,
  Container,
  NavItem,
  NavLink
} from "reactstrap";
class ManagerNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "primary"
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
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
            to={'/panelStations'}
          >

            <h3 className="h3 h3_white_title">Estaciones</h3>
          </Link>
          <Link
            className={"mr-4"}
            to={'/panelBikes'}
          >

            <h3 className="h3 h3_white_title">Bicicletas</h3>
          </Link>
          
          <Link
            className={"mr-4"}
            to={'/panelUsers'}
          >
            <h3 className="h3 h3_white_title">Usuarios</h3>
          </Link>

          
          <Link
            className={"mr-4"}
            to={'/panelPlans'}
          >
            <h3 className="h3 h3_white_title">Planes</h3>
          </Link>

          <button
            className={"btn transparent"}
          >
            <h3 className="h3 h3_white_title">cerrar sesión</h3>
          </button>
        </Navbar>
      </>
    );
  }
}
export default ManagerNavbar;