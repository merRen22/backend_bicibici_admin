import React from "react";

import "../styles/List.css";

class ReportListItem extends React.Component {
  handleClick = () => {
    this.props.onReportSolve(0);
  };

  render() {
    return (
      <div>
        <div className="col-12">
          <div className="row">
            <strong className="mr-4">Codigo:</strong>
            <strong>{this.props.report.uuidReport}</strong>
          </div>
          <br />
          <div className="row">
            <div className="col-1"></div>
            <div className="col-3">
              <div className="row">
                ID bicicleta : {this.props.report.uuidBike}
              </div>
              <div className="row">
                Descripcion : {this.props.report.description}
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-3">
              <div className="row">Latitud : {this.props.report.latitude}</div>
              <div className="row">
                Longitud : {this.props.report.longitude}
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-2 vCenterItems">
              <div className="row">
                <div>
                  <a
                    className="btn btn-success"
                    target="_blank"
                    href={`https://maps.google.com/maps?q=${this.props.report.latitude},${this.props.report.longitude}`}
                  >
                    Mapa
                  </a>
                </div>
                <br />
                <br />
                <div></div>
              </div>
            </div>
          </div>
          <div>
                      <br />
                      <button
                        onClick={this.handleClick}
                        className={"btn btn-info"}
                      >
                        Resolver
                      </button>
                    </div>
        </div>
      </div>
    );
  }
}

class ReportList extends React.Component {

  render() {
    if (this.props.reports.length === 0) {
      return (
        <div>
          <h3>No hay reportes registrados</h3>
        </div>
      );
   }
   var index = 0

    return (
      <div className="customList">
        <ul className="list-unstyled">
          {this.props.reports.map(obj => {
            obj.index = index
            index++
            return (
              <div key={obj.uuidReport}>
                <div className="customListItem">
                  <li>
                    <ReportListItem 
                    report={obj} 
                    onReportSolve = {this.props.onReportSolve}
                    />
                  </li>
                </div>
                <br />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ReportList;
