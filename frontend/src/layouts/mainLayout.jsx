
import React from "react";
import { Route   } from "react-router-dom";

// core components
import MainNavbar from "../components/NavBars/mainNavBar.jsx";

var ps;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  componentDidUpdate(e) {
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = "bicibici"
  render() {
    return (
      <>
        <div className="wrapper">
          
          
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <MainNavbar
              {...this.props}
              brandText= {this.getBrandText}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
          </div>
        </div>
      </>
    );
  }
}
export default MainLayout;