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

var QRCode = require('qrcode.react');

class RegistrarBike extends React.Component {
  state = {
    loading: false,
    error: null,
    success: null,
    modalDeleteIsOpen: false,
    data: undefined,
    missedValue: false,
  };

  componentDidMount() {
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: null });
    try {
      var response = await api.bike.create();
      console.log(response.message)
      if (response.message != "") {
        this.setState({ loading: false, success: response.message });
      } else {
        this.setState({ loading: false, error: "error" });
      }
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };


  handleOnSuccess = async e => {
    this.props.history.push('/panelBikes')
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
        <br/>
        Codigo QR : 
        <br/>
        <br/>
  <QRCode value={this.state.success} />
  <br/>  
<br/>
        Codigo :
        <br/>
        <br/>
  {this.state.success}
        </div>
        
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
        <h3>Registrar nueva bicicleta</h3>
        <br /><br />


        <Form onSubmit={this.handleSubmit}>

          <div className="container">
            <div className="row">
              <h3>El registro de una bicicleta crea un código único para la bicicleta y registra sus estados en el sistema, los cuales se actualizarán cuando la bicicletas inicie operaciones</h3>
            </div>
            <br /><br />
            <div className="row">
              <button type="submit" step="0.1" className="btn btn-success mr-4">Crear registro</button>
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

export default RegistrarBike;