import React from "react";
import { Link } from 'react-router-dom';

class LoginFormCard extends React.Component {
  handleClick = e => {
    console.log("Button was clicked");
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Form was submitted");
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="email"
              value={this.props.formValues.firstName}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="password"
              value={this.props.formValues.lastName}
            />
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">
            <Link className="btn btn-primary" to="/panelStations">
              Login
            </Link>
          </button>
        </form>
      </div>
    );
  }
}

export default LoginFormCard;
