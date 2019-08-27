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
    form: {
      Address: '',
      TotalSlots: 0,
      Longitude: 0.0,
      Latitude: 0.0,
    },
  };
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData = async () => {
    try {
      var addres = { "Address":this.props.match.params.Address}
      const data = await api.stations.read(addres);
      this.state.form.Address = data.Address
      this.state.form.TotalSlots = data.TotalSlots
      this.state.form.Longitude = data.Longitude
      this.state.form.Latitude = data.Latitude
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
      var Address = {"Address": this.props.match.params.Address};
      const data = await api.stations.remove(Address);
      
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

  handleSubmit = async e => {
    e.preventDefault();

    /*
    this.setState({ loading: true, error: null });
    try {
      await api.stations.create(this.state.form);
      this.props.history.push('/panelStations')
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
    */
  };
  
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  
  editItem = async () => {
    this.setState({ 
      loading: true,
       error: null });
    this.props.history.push('/panelStations')


    /*
    try {
      const data = await api.stations.read(this.props.match.Address);
      
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
                  <Label for="Address">Dirección</Label>
                  <Input 
                  onChange={this.handleChange}
                  value={this.state.data.Address}
                  type="Address" name="Address" id="Address" placeholder="dirección" />
                </FormGroup>
                <br/>
                
                <FormGroup>
                  <Label for="v">Espacios</Label>
                  <Input 
                  onChange={this.handleChange}
                  value={this.state.data.TotalSlots}
                  type="TotalSlots" name="TotalSlots" id="TotalSlots" placeholder="espacios" />
                </FormGroup>
          </div>
          
          <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="Latitude">Latitud</Label>
                  <Input 
                  onChange={this.handleChange}
                  value={this.state.data.Latitude}
                  type="Latitude" name="latitudEstacion" id="latitudEstacion" placeholder="latitud" />
                </FormGroup>
                
                <FormGroup>
                  <Label for="Longitude">Longitud</Label>
                  <Input 
                  onChange={this.handleChange}
                  value={this.state.data.Longitude}
                  type="Longitude" name="Longitude" id="Longitude" placeholder="longitud" />
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