import React from "react";
import classnames from "classnames";
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ReactDOM from 'react-dom';


import ModalEditarStation from "./modalEditarStation";
import ModalEliminarStation from "./modalEliminarStation";

function PanelStations(props) {
  return (
    
    <div>
    <div className="container">
      <br />
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
        <div className="col-10 vCenterItems container">
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>
                  Gaaaaa
              </td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>
                <Button onClick={props.toggleModalEditar}  color="info">Editar</Button>{' '}
                <ModalEditarStation 
                    isOpen={props.modalEditarIsOpen} 
                    onClose={props.toggleModalEditar} 
                    />
                </td>
                <td>
                  <Button onClick={props.toggleModalEliminar}  color="danger">Eliminar</Button>{' '}
                  <ModalEliminarStation
                    isOpen={props.modalDeleteIsOpen} 
                    onClose={props.toggleModalEliminar} 
                    />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>


                  

    </div>
    
  )
}

export default PanelStations;

/*






*/