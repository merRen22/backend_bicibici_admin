
import React from "react";
import classNames from "classnames";

import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

class MainNavbar extends React.Component {
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
              </NavbarBrand>
            </div>
          </Container>
        </Navbar>
      </>
    );
  }
}
export default MainNavbar;