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
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import StationsList from '../../components/stations/stationsList.jsx'
import '../../components/styles/List.css'



function PanelStations(props) {

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
                <Link className="btn btn-success" to={`/panelStationsRegistration`}>Registrar</Link>
              </div>
            </div>

          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="row justify-content-center">
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink onClick={props.onPreviousPress}  previous></PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={props.onNextPress} next ></PaginationLink>
          </PaginationItem>
          </Pagination>

        </div>
            <br />
        <div className="row">
          <div className="col-12 vCenterItems container">
<div className="itemsList__container">
          <StationsList stations={props.data} />
</div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default PanelStations;