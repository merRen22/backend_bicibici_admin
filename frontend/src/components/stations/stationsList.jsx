import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/List.css'

class StationsListItem extends React.Component {
  render() {
    return (
      <div className="customListItem">
        <div className="row">
          <div className="col-6">

            <strong className="mr-4">
              Direccion:
            </strong>
            <strong>
              {this.props.station.address}
            </strong>
            <br />
            <div className="col">
              <div className="row">
                Latitud : {this.props.station.latitude}
              </div>
              <div className="row">
                Longitud : {this.props.station.longitude}
              </div>
              <div className="row">
                Espacios : {this.props.station.totalSlots}
              </div>
            </div>

            <br />

          </div>
          <div className="col-6">
            <br />
            <div className="row">
              <Link className="btn btn-info"
                to={`/panelStationsInfo/${this.props.station.uuidPlan}`}>
                información</Link>
              <div className="col-12">
                <br />
                <a
                  className="btn btn-success"
                  target="_blank"
                  href={`https://maps.google.com/maps?q=${this.props.station.Latitude},${this.props.station.Longitude}`}>Mapa</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class StationsList extends React.Component {
  render() {
    if (this.props.stations.length === 0) {
      return (
        <div>
          <h3>No hay estacionamientos registrados</h3>
        </div>
      );
    }

    return (
      <div className="customList">
        <ul className="list-unstyled">
          {this.props.stations.map(obj => {
            return (
              <li key={obj.uuidStation}>
                <StationsListItem station={obj} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default StationsList;
