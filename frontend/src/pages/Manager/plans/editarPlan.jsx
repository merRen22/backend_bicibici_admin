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
import ModalEliminarPlan from "./modalEliminarPlan";
import PageSuccess from "../../../components/pageSuccess"

class EditarPlan extends React.Component {
  state = {
    loading: true,
    error: null,
    modalDeleteIsOpen: false,
    data: undefined,
    success: null,
    missedValue:false,
    form: {
      uuidPlan: '',
      name: '',
      cost: 0.0,
      duration: 0
    },
  };
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData = async () => {
    try {
      var uuidPlan = { "uuidPlan":this.props.match.params.uuidPlan}
      const data = await api.plans.read(uuidPlan);
      this.state.form.name = data.Items[0].name
      this.state.form.cost = data.Items[0].cost
      this.state.form.duration = data.Items[0].duration
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
      var uuidPlan = {"uuidPlan": this.props.match.params.uuidPlan};
      const response = await api.plans.remove(uuidPlan);
      
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
      this.state.form.name == ""  ||
      this.state.form.cost == "" ||
      this.state.form.duration == ""
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
      this.state.form.uuidPlan = this.props.match.params.uuidPlan
      const response = await api.plans.update(this.state.form);
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
    this.props.history.push('/panelPlans')
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
        
        <ModalEliminarPlan
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
                  <Label for="name">Nombre</Label>
                  <Input 
                  onChange={this.handleChange}
                  value={this.state.form.name}
                  type="text" name="name" id="name" placeholder="Nombre" required/>
                </FormGroup>
                <br/>
                
                <FormGroup>
                  <Label for="cost">Costo</Label>
                  <Input 
                  onChange={this.handleChange} type={'number'} step={'.01'} min={1}
                  defaultValue ={this.state.form.cost}
                  type="number" name="cost" id="cost" placeholder="Csoto" />
                </FormGroup>
          </div>
          
          <div className="row">
            
          <FormGroup className="mr-4">
                  <Label for="duration">Duración</Label>
                  <Input 
                  defaultValue={this.state.form.duration}
                  type="number" 
                  onChange={this.handleChange} type={'number'} step={'1'} min={1}
                  name="duration" id="duration" placeholder="Duración" />
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

export default EditarPlan;