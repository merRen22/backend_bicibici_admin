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
    loading: true,
    error: null,
    modalDeleteIsOpen: false,
    data: undefined,
  };
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData = async () => {
    try {
      const data = await api.stations.read(this.props.match.stationID);
      
      
      this.setState({ 
        loading: false,
         data: data
        });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  deleteItem = async () => {
    this.setState({ 
      modalDeleteIsOpen: false,
      loading: true,
       error: null });
       console.log(this.props.match.params.stationID)

    try {
      var StationID = {StationID: parseInt(this.props.match.params.stationID)};
      
      const data = await api.stations.remove(StationID);
      this.props.history.push('/panelStations')
      /*
      this.setState({ 
        loading: false,
         data: data
        });
        */
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };
  
  editItem = async () => {
    this.setState({ 
      loading: true,
       error: null });
    this.props.history.push('/panelStations')


    /*
    try {
      const data = await api.stations.read(this.props.match.stationID);
      
      this.setState({ 
        loading: false,
         data: data
        });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
    */
  };
  
  handleModalEliminar = e => {
    this.setState({ modalDeleteIsOpen: !this.state.modalDeleteIsOpen });
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
        
        <ModalEliminarStation
        isOpen={this.state.modalDeleteIsOpen}
        onClose={this.handleModalEliminar}
        onDeleteStation={this.deleteItem}
      />

        <br />
        <h3>Editar estación</h3>
        <br /><br />

        
        <Form>
        <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="direccionEstacion">Dirección</Label>
                  <Input 
                  value={this.state.data.Address}
                  type="direccionEstacion" name="direccionEstacion" id="direccionEstacion" placeholder="dirección" />
                </FormGroup>
                <br/>
                
                <FormGroup>
                  <Label for="espaciosEstacion">Espacios</Label>
                  <Input 
                  value={this.state.data.TotalSlots}
                  type="espaciosEstacion" name="espaciosEstacion" id="espaciosEstacion" placeholder="espacios" />
                </FormGroup>
          </div>
          
          <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="latitudEstacion">Latitud</Label>
                  <Input 
                  value={this.state.data.Latitude}
                  type="latitudEstacion" name="latitudEstacion" id="latitudEstacion" placeholder="latitud" />
                </FormGroup>
                
                <FormGroup>
                  <Label for="longitudEstacion">Longitud</Label>
                  <Input 
                  value={this.state.data.Longitude}
                  type="longitudEstacion" name="longitudEstacion" id="longitudEstacion" placeholder="longitud" />
                </FormGroup>
          </div>
              </Form>

        <div>
        <br /><br />
          <div className="row">
          <button onClick={this.editItem} className="btn btn-success mr-4">Guardar cambios</button>
          <button onClick={this.handleModalEliminar} className="btn btn-danger mr-4">Eliminar</button>
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