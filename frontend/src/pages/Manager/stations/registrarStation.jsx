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

class EditarStation extends React.Component {
  state = {
    loading: false,
    error: null,
    success: null,
    modalDeleteIsOpen: false,
    data: undefined,
    missedValue:false,
    form: {
      address: '',
      totalSlots: 0,
      longitude: 0.0,
      latitude: 0.0,
    },
  };

  componentDidMount() {
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (
      this.state.form.qddress == "" ||
      this.state.form.latitude == "" ||
      this.state.form.longitude == "" ||
      this.state.form.totalSlots == ""
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
        var response = await api.stations.create(this.state.form);
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
        <h3>Crear nueva estación</h3>
        <br /><br />


        <Form onSubmit={this.handleSubmit}>
          <div className="row">

            <FormGroup className="mr-4">
              <Label for="address">Dirección</Label>
              <Input
                onChange={this.handleChange}
                type="text" name="address" id="address" placeholder="dirección" required/>
            </FormGroup>
            <br />

            <FormGroup>
              <Label for="totalSlots">Espacios</Label>
              <Input
                onChange={this.handleChange} type={'number'} step={'1'} min={1}
                name="totalSlots" id="totalSlots" placeholder="espacios" required/>
            </FormGroup>
          </div>

          <div className="row">

            <FormGroup className="mr-4">
              <Label for="latitude">Latitud</Label>
              <Input
                onChange={this.handleChange} type={'number'} step={'.0000001'}
                name="latitude" id="latitude" placeholder="latitud" required/>
            </FormGroup>

            <FormGroup>
              <Label for="longitude">Longitud</Label>
              <Input
                onChange={this.handleChange} type={'number'} step={'.0000001'}
                name="longitude" id="longitude" placeholder="longitud" required/>
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

/*


          <button onClick={} className="btn btn-success mr-4">Editar</button>
*/

export default EditarStation;