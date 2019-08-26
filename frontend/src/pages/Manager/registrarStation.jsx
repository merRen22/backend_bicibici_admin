import React from 'react';
import {
  Form,
  FormGroup, Modal,
  Label,
  Input, } from 'reactstrap';

import api from '../../api.js'

import '../../components/modal.jsx';
import PageLoading from "../../components/pageLoading"
import PageError from "../../components/pageError"
import ModalEliminarStation from "./modalEliminarStation";

class EditarStation extends React.Component {
  state = {
    loading: false,
    error: null,
    modalDeleteIsOpen: false,
    data: undefined,
  };
  
  componentDidMount() {
  }
  
  createData = async () => {
    try {
      const data = await api.stations.create();
      
      
      this.setState({ 
        loading: false,
         data: data
        });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  
  render() {

    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={"Hubo un problema al obtener los datos, intentelo en otro momento 😢"} />;
    }

  return (
      <div className="DeleteBadgeModal">

        <br />
        <h3>Crear nueva estación</h3>
        <br /><br />

        
        <Form>
        <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="direccionEstacion">Dirección</Label>
                  <Input 
                  type="direccionEstacion" name="direccionEstacion" id="direccionEstacion" placeholder="dirección" />
                </FormGroup>
                <br/>
                
                <FormGroup>
                  <Label for="espaciosEstacion">Espacios</Label>
                  <Input 
                  type="espaciosEstacion" name="espaciosEstacion" id="espaciosEstacion" placeholder="espacios" />
                </FormGroup>
          </div>
          
          <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="latitudEstacion">Latitud</Label>
                  <Input 
                  type="latitudEstacion" name="latitudEstacion" id="latitudEstacion" placeholder="latitud" />
                </FormGroup>
                
                <FormGroup>
                  <Label for="longitudEstacion">Longitud</Label>
                  <Input 
                  type="longitudEstacion" name="longitudEstacion" id="longitudEstacion" placeholder="longitud" />
                </FormGroup>
          </div>
              </Form>

        <div>
        <br /><br />
          <div className="row">
          <button onClick={this.createData} className="btn btn-success mr-4">Registrar</button>
          </div>
        </div>
        <br/>
      </div>
  );
  
}
}

/*


          <button onClick={} className="btn btn-success mr-4">Editar</button>
*/

export default EditarStation;