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
    form: {
      Address: '',
      TotalSlots: 0,
      Longitude: 0.0,
      Latitude: 0.0,
    },
  };
  
  componentDidMount() {
  }
  
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    try {
      await api.stations.create(this.state.form);
      this.props.history.push('/panelStations')
    } catch (error) {
      console.log(error)
      this.setState({ loading: false, error: error });
    }
  };
  
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
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

        
        <Form onSubmit={this.handleSubmit}>
        <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="Address">Dirección</Label>
                  <Input 
                  onChange={this.handleChange}
                  type="text" name="Address" id="Address" placeholder="dirección" />
                </FormGroup>
                <br/>
                
                <FormGroup>
                  <Label for="TotalSlots">Espacios</Label>
                  <Input 
                  onChange={this.handleChange}
                  type="number" name="TotalSlots" id="TotalSlots" placeholder="espacios" />
                </FormGroup>
          </div>
          
          <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="Latitude">Latitud</Label>
                  <Input 
                  onChange={this.handleChange}
                  type="text" name="Latitude" id="Latitude" placeholder="latitud" />
                </FormGroup>
                
                <FormGroup>
                  <Label for="Longitude">Longitud</Label>
                  <Input 
                  onChange={this.handleChange}
                  type="text" name="Longitude" id="Longitude" placeholder="longitud" />
                </FormGroup>
          </div>

        <div>
        <br /><br />
          <div className="row">
          <button type="submit" className="btn btn-success mr-4">Registrar</button>
          </div>
        </div>
        
        </Form>
        <br/>
      </div>
  );
  
}
}

/*


          <button onClick={} className="btn btn-success mr-4">Editar</button>
*/

export default EditarStation;