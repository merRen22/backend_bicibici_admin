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
      console.log(data)
      this.state.form.Address = data.Items[0].Address
      this.state.form.TotalSlots = data.Items[0].TotalSlots
      this.state.form.Longitude = data.Items[0].Longitude
      this.state.form.Latitude = data.Items[0].Latitude
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

    this.setState({ 
      loading: true,
       error: null });
    
    //this.props.history.push('/panelStations')

    try {
      console.log("gaaaaaaaaa")
      console.log(this.state.form)
      const data = await api.stations.update(this.state.form);
      
      this.setState({ 
        loading: false,
        });
    } catch (error) {
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

        
        <Form onSubmit={this.handleSubmit}>
        <div className="row"  >
            
          <FormGroup className="mr-4">
                  <Label for="Address">Dirección</Label>
                  <Input 
                  onChange={this.handleChange}
                  value={this.state.form.Address}
                  type="text" name="Address" id="Address" placeholder="dirección" />
                </FormGroup>
                <br/>
                
                <FormGroup>
                  <Label for="TotalSlots">Espacios</Label>
                  <Input 
                  onChange={this.handleChange}
                  defaultValue ={this.state.form.TotalSlots}
                  type="number" name="TotalSlots" id="TotalSlots" placeholder="espacios" />
                </FormGroup>
          </div>
          
          <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="Latitude">Latitud</Label>
                  <Input 
                  onChange={this.handleChange}
                  defaultValue={this.state.form.Latitude}
                  type="text" name="Latitude" id="Latitude" placeholder="latitud" />
                </FormGroup>
                
                <FormGroup>
                  <Label for="Longitude">Longitud</Label>
                  <Input 
                  onChange={this.handleChange}
                  defaultValue={this.state.form.Longitude}
                  type="text" name="Longitude" id="Longitude" placeholder="longitud" />
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

        <br/>
      </div>
  );
  
}
}

/*


          <button onClick={} className="btn btn-success mr-4">Editar</button>
*/

export default EditarStation;