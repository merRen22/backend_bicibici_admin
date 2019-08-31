import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/List.css'

var QRCode = require('qrcode.react');

class BikesListItem extends React.Component {
  render() {
    return (
      <div className="customListItem">
        <div className="row">
          <div className="col-4">

          <QRCode value={this.props.station.uuidBike} />
            </div>
          <div className="col-4">

            <strong className="mr-4">
              Codigo:
            </strong>
            <strong>
              {this.props.station.uuidBike}
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
                Disponible : {this.props.station.available == 1 ? "Si" : "No"}
              </div>
            </div>

            <br />

          </div>
          <div className="col-4">

            <br />
            <div className="row">



              <Link className="btn btn-info"
                to={`/panelBikesInfo/${this.props.station.uuidBike}`}>
                información</Link>
              <div className="col-12">

                <br />

                <a
                  className="btn btn-success"
                  target="_blank"
                  href={
                    `https://maps.google.com/maps?q=${this.props.station.latitude},${this.props.station.longitude}`}>Mapa</a>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

class BikesList extends React.Component {
  render() {
    if (this.props.stations.length === 0) {
      return (
        <div>
          <h3>No hay bicicletas registradas</h3>
        </div>
      );
    }

    return (
      <div className="customList">
        <ul className="list-unstyled">
          {this.props.stations.map(obj => {
            return (
              <li key={obj.uuidBike}>
                <BikesListItem station={obj} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default BikesList;
