import React from 'react';
import {
  Form,
  FormGroup,
  Alert,
  Label,
  Input,
} from 'reactstrap';

import api from '../../../api.js'

import '../../../components/modal.jsx';
import PageLoading from "../../../components/pageLoading"
import PageError from "../../../components/pageError"
import PageSuccess from "../../../components/pageSuccess"

class RegistrarPlan extends React.Component {
  state = {
    loading: false,
    error: null,
    success: null,
    modalDeleteIsOpen: false,
    data: undefined,
    missedValue:false,
    form: {
      name: '',
      cost: 0.0,
      duration: 0
    },
  };

  componentDidMount() {
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (
      this.state.form.name == "" ||
      this.state.form.cost == "" ||
      this.state.form.duration == ""
    ) {

      this.setState({
        loading: false,
        error: null,
        success: null,
        missedValue: true
      });

    } else {

      this.setState({ loading: true, error: null });
      try {
        var response = await api.plans.create(this.state.form);
        console.log(response.message)
        if (response.message = "Registro Correcto") {
          this.setState({ loading: false, success: response.message });
        } else {

        }
      } catch (error) {
        this.setState({ loading: false, error: error });
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

  render() {
    var validationMessage

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

        <br />
        <h3>Registrar nuevo plan</h3>
        <br /><br />


        <Form onSubmit={this.handleSubmit}>
          <div className="row">

            <FormGroup className="mr-4">
              <Label for="name">Nombre</Label>
              <Input
                onChange={this.handleChange}
                type="text" name="name" id="name" placeholder="nombre" required/>
            </FormGroup>
            <br />

            <FormGroup>
              <Label for="cost">Costo</Label>
              <Input
                type="number" 
                onChange={this.handleChange} type={'number'} step={'.01'} min={1}
                
                name="cost" id="cost" placeholder="Costo" required/>
            </FormGroup>
          </div>

          <div className="row">

            <FormGroup className="mr-4">
              <Label for="duration">Duración (días)</Label>
              <Input
                type="number" 
                onChange={this.handleChange} type={'number'} step={'1'} min={1}
                name="duration" id="duration" placeholder="duration" required/>
            </FormGroup>
          </div>

          <div>
            <br /><br />
            <div className="row">
              <button type="submit" step="0.1" className="btn btn-success mr-4">Registrar</button>
            </div>
          </div>

        </Form>
        <br />
        
        <div className="row mt-4">
{validationMessage}
              </div>
      </div>
    );

  }
}

export default RegistrarPlan;