import React from "react";
import classnames from "classnames";

import LoginFormCard from "../components/forms/loginFormCard.jsx";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";



class Login extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      form: {
        firstName: "",
        lastName: ""
      }
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        firstName: tab=="1"?"admin@bicibici.com":"gestor@bicibici.com",
        lastName: "*********"
      });
    }
  }

  render() {
    return (
      <div className="container"id="root">
        <div className="row">
          <div className="col-6 vCenterItems">
            <h1 className="h1 h1_black_mega_title">bicibici</h1>
          </div>
          <div className="col-6">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Administrador
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Gestor
                </NavLink>
              </NavItem>
            </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">

            <Card>
              <CardBody>
                <LoginFormCard
                  onChange={this.handleChange}
                  formValues={this.state.form}
                />
              </CardBody>
            </Card>

              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">

            <Card>
              <CardBody>
                <LoginFormCard
                  onChange={this.handleChange}
                  formValues={this.state.form}
                />
              </CardBody>
            </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>

          </div>
        </div>
      </div>
    );
  }
}

export default Login;
