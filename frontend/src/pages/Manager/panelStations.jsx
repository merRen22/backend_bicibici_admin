import React from "react";
import classnames from "classnames";

import { Table,Button } from 'reactstrap';




class PanelStations extends React.Component {
    render(){
        return <div>
            <div className="row">
                <div className="col-8">

                </div>
                <div className="col-4">
                    <Button color="success">Registrar</Button>{' '}
                </div>
            </div>
            <div row>
                    
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
                  <Button color="info">Editar</Button>{' '}
                  </td>
              <td>
                  <Button color="danger">Eliminar</Button>{' '}
              </td>
            </tr>
          </tbody>
        </Table>
    

            </div>
        </div>
    }
} 

export default PanelStations;