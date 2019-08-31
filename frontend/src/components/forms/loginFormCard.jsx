import React from "react";
import { Link } from 'react-router-dom';

class LoginFormCard extends React.Component {

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="email"
              name="email"
              value={this.props.formValues.firstName}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="password"
              name="password"
              value={this.props.formValues.lastName}
            />
          </div>
        </form>
        
        <button
            type="button"
            onClick={this.props.onLogUser}
            className="btn btn-primary">
            Login
          </button>
      </div>
    );
  }
}

export default LoginFormCard;
