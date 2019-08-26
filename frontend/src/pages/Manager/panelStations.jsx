import React from "react";
import classnames from "classnames";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Pagination,
  PaginationItem
} from 'reactstrap';
import { Link } from 'react-router-dom';



function PanelStations(props) {
  var index = 1;
  var indexStation = 0;

  return (
    <div>
      <div className="container">
        <br />

        <div className="row">
          <div className="col-10 vCenterItems container">

            <div className="col-6  container ">
              <Form>
                <FormGroup>
                  <Label for="nombreEstacion">Nombre</Label>
                  <Input type="nombreEstacion" name="nombreEstacion" id="nombreEstacion" placeholder="estación" />
                </FormGroup>
              </Form>
            </div>
            <div className="col-4 container">
              <div className="Row">
                <Button color="primary">Buscar</Button>{' '}
                <Button color="success">Registrar</Button>{' '}
              </div>
            </div>

          </div>
        </div>
        <br />
        <br />
        <br />

        <div className="row">
          <div className="col-12 vCenterItems container">
            <Table responsive striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Dirección</th>
                  <th>Latitud</th>
                  <th>Longitud</th>
                  <th>Espacios maximos</th>
                  <th>Fecha de creación</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.data.stations.map(station => {
                  return (
                    <tr key={station.StationID}>
                      <th>{index++}</th>
                      <td>{station.Address}</td>
                      <td>{station.Latitude}</td>
                      <td>{station.Longitude}</td>
                      <td>{station.TotalSlots}</td>
                      <td>{station.createdAt}</td>
                      <td><Link className="btn btn-info" to={`/panelStationsInfo/${station.StationID}`}>información</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="row vCenterItems">

          <br />
          <Pagination>
            {
              props.dataPages.map(v => {
                return (<div key={v}>
                  <PaginationItem>
                    <button className="btn transparent mr-0">
                      <h5>{v}</h5>
                    </button>
                  </PaginationItem>
                </div>
                )
              })}
          </Pagination>
        </div>
      </div>




    </div>

  )
}

export default PanelStations;