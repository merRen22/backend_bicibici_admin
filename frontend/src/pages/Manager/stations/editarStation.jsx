import React from 'react';
import {
  Form,
  FormGroup,
  Alert,
  Label,
  Input, } from 'reactstrap';

import api from '../../../api.js'

import '../../../components/modal.jsx';
import PageLoading from "../../../components/pageLoading"
import PageError from "../../../components/pageError"
import ModalEliminarStation from "./modalEliminarStation";
import PageSuccess from "../../../components/pageSuccess"

class EditarStation extends React.Component {
  state = {
    loading: true,
    error: null,
    modalDeleteIsOpen: false,
    data: undefined,
    success: null,
    missedValue:false,
    form: {
      uuidStation: '',
      address: '',
      totalSlots: 0,
      longitude: 0.0,
      latitude: 0.0,
    },
  };
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData = async () => {
    try {
      var uuidStation = { "uuidStation":this.props.match.params.uuidStation}
      const data = await api.stations.read(uuidStation);
      this.state.form.address = data.Items[0].address
      this.state.form.totalSlots = data.Items[0].totalSlots
      this.state.form.longitude = data.Items[0].longitude
      this.state.form.latitude = data.Items[0].latitude
      this.setState({ 
        loading: false,
         data: data.Items[0]
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

    try {
      var uuidStation = {"uuidStation": this.props.match.params.uuidStation};
      const response = await api.stations.remove(uuidStation);

      if(response.message == "Estación Eliminada"){
        this.setState({ loading: false, success: response.message });
      }else{
        this.setState({ loading: false,missedValue: false});
      }
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();

    if(
      this.state.form.address == ""  ||
      this.state.form.latitude == "" ||
      this.state.form.longitude == "" ||
      this.state.form.totalSlots == ""
      ){
      
    this.setState({ 
      loading: false,
       error: null,
      success:null,
      missedValue: true,
      success: null,
     });

    }else{
      
    this.setState({ 
      loading: true,
       error: null });
    try {
      this.state.form.uuidStation = this.props.match.params.uuidStation
      const response = await api.stations.update(this.state.form);
      if(response.message == "Actualización Correcta"){
        this.setState({ loading: false, success: response.message });
      }else{
        this.setState({ loading: false,missedValue: false});
      }
    } catch (error) {
      this.setState({ loading: false, error: error,missedValue: false });
    }

    }
  };
  
  handleOnSuccess = async e => {
    this.props.history.push('/panelStations')
  };
  
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  
  handleModalEliminar = e => {
    this.setState({ modalDeleteIsOpen: !this.state.modalDeleteIsOpen });
  };

  
  render() {
    var validationMessage;

    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={"Hubo un problema al obtener los datos, intentelo en otro momento 😢"} />;
    }
    
    if (this.state.success) {
      return (<div>
        <PageSuccess />
        <div className="DeleteBadgeModal">
          <button type="button" className="btn btn-success mr-4" onClick={this.handleOnSuccess} >Volver</button>
        </div>
      </div>);
    }

    if (this.state.missedValue) {
      validationMessage = <Alert color="danger">
      Un campo no esta completo
    </Alert>;
    } else {
      validationMessage = <div></div>;
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

        
        <Form onSubmit={this.handleSubmit}>
        <div className="row"  >
            
          <FormGroup className="mr-4">
                  <Label for="Address">Dirección</Label>
                  <Input 
                  onChange={this.handleChange}
                  value={this.state.form.address}
                  type="text" name="address" id="address" placeholder="dirección" required/>
                </FormGroup>
                <br/>
                
                <FormGroup>
                  <Label for="totalSlots">Espacios</Label>
                  <Input 
                  onChange={this.handleChange} type={'number'} step={'1'} min={1}
                  defaultValue ={this.state.form.totalSlots}
                  type="number" name="totalSlots" id="totalSlots" placeholder="espacios" />
                </FormGroup>
          </div>
          
          <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="latitude">Latitud</Label>
                  <Input 
                  defaultValue={this.state.form.latitude}
                  onChange={this.handleChange} type={'number'} step={'.0000001'}
                  name="latitude" id="latitude" placeholder="latitud" />
                </FormGroup>
                
                <FormGroup>
                  <Label for="longitude">Longitud</Label>
                  <Input 
                  defaultValue={this.state.form.longitude}
                  onChange={this.handleChange} type={'number'} step={'.0000001'}
                  name="longitude" id="longitude" placeholder="longitud" />
                </FormGroup>
          </div>

          
        <div>
        <br /><br />
          <div className="row">
          <button type="submit" className="btn btn-success mr-4">Guardar cambios</button>
          <button type="button" onClick={this.handleModalEliminar} className="btn btn-danger mr-4">Eliminar</button>
          </div>
        </div>
              </Form>
              <div className="row mt-4">{validationMessage}
              </div>
        <br/>
      </div>
  );
  
}
}

export default EditarStation;