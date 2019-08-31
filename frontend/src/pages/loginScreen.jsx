import React from "react";
import classnames from "classnames";

import LoginFormCard from "../components/forms/loginFormCard.jsx";
import { Redirect } from 'react-router-dom'


import PageLoading from "../components/pageLoading"
import PageError from "../components/pageError"

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Alert,
  Col,
  Card,
  CardBody
} from "reactstrap";
import api from "../api.js";



class Login extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      loginMessage: null,
      toHome: false,
      loading: false,
      error: null,
      form: {
        email: "",
        password: ""
      }
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleLogin = async () => {
    try {
      this.setState({ loading: true });
      const data = await api.accounts.login(this.state.form);
      if (data.message != "Autentificado") {
        this.setState({ 
          loginMessage: data.message,
          loading: false});  
      } else {
        localStorage.setItem('user', JSON.stringify({
          "status": "auth"
        }));
        this.setState({
          loading: false,
          toHome: true
        });
      }

    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    var validationMessage;

    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={"Hubo un problema al obtener los datos, intentelo en otro momento 😢"} />;
    }

    if (this.state.loginMessage) {
      validationMessage = <Alert color="danger">
        {this.state.loginMessage}
      </Alert>;
    } else {
      validationMessage = <div></div>;
    }

    if (this.state.toHome === true) {
      return <Redirect to='/panelStations' />
    }

    return (
      <div className="container" id="root">
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
                    //this.toggle("1");
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
                        <div>


                          <LoginFormCard
                            onChange={this.handleChange}
                            formValues={this.state.form}
                            onLogUser={this.handleLogin}
                          />
                          <div className="row mt-4">{validationMessage}</div>
                          </div>
                        
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
                            onLogUser={this.handleLogin}
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
    
    
    /*
    
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

        */
        
        
        /*
        
        
        
        
                        <div>
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={this.handleChange}
                className="form-control"
                type="text"
                name="email"
                value={this.state.form.firstName}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                onChange={this.handleChange}
                className="form-control"
                type="text"
                name="password"
                value={this.state.form.lastName}
              />
            </div>
          </form>

          <button
            type="button"
            onClick={this.handleLogin}
            className="btn btn-primary">
            Login
          </button>
        </div>







        */