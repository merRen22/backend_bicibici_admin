import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/List.css'

class AccountsListItem extends React.Component {
  render() {
    return (
      <div className="customListItem">
        <div className="row">
          <div className="col-6">

            <strong className="mr-4">
              Correo:
            </strong>
            <strong>
              {this.props.station.email}
            </strong>
            <br />
            <br />
            <div className="col">
              <div className="row">
                Tipo de cuenta : {this.props.station.typeAccount=="G"?"Gestor":"Administrador"}
              </div>
            </div>

            <br />

          </div>
          <div className="col-6">
            <br />
            <br />
            <div className="row">
              <Link className="btn btn-info"
                to={`/panelAccountsInfo/${this.props.station.uuidAccount}`}>
                información</Link>
                <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AccountsList extends React.Component {
  render() {
    if (this.props.stations.length === 0) {
      return (
        <div>
          <h3>No hay trabajadores registrados</h3>
        </div>
      );
    }

    return (
      <div className="customList">
        <ul className="list-unstyled">
          {this.props.stations.map(obj => {
            return (
              <li key={obj.uuidAccount}>
                <AccountsListItem station={obj} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AccountsList;
