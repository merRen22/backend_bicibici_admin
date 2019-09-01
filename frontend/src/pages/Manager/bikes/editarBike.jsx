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
import ModalEliminarBikes from "./modalEliminarBikes";
import PageSuccess from "../../../components/pageSuccess"
import Select, { components } from 'react-select'

const optionsAvailable = [
  { value: 1, label: 'Disponible', name: 'available' },
  { value: 0, label: 'No disponible', name: 'available' }
];

const optionsIntervened = [
    { value: 1, label: 'Bloqueada', name: 'isIntervened' },
    { value: 0, label: 'No bloqueada', name: 'isIntervened' }
  ];

class EditarBike extends React.Component {
  state = {
    loading: true,
    error: null,
    modalDeleteIsOpen: false,
    data: undefined,
    success: null,
    missedValue: false,
    dropdownOpen: false,
    form: {
        uuidBike: '',
        available : 0,
        isIntervened : 0,
        isMoving : 0,
        latitude : 0.0,
        longitude : 0.0,
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      var uuidBike = { "uuidBike": this.props.match.params.uuidBike }
      const data = await api.bike.read(uuidBike);
      this.state.form.available = data.Items[0].available
      this.state.form.isIntervened = data.Items[0].isIntervened
      this.state.form.isMoving = data.Items[0].isMoving
      this.state.form.latitude = data.Items[0].latitude
      this.state.form.longitude = data.Items[0].longitude
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
      error: null
    });

    try {
      var uuidBike = { "uuidBike": this.props.match.params.uuidBike };
      const response = await api.bike.remove(uuidBike);

      if(response.message == "Bicileta Eliminada"){
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
    if (
      this.state.form.latitude == "" ||
      this.state.form.longitude == "" ||
      this.state.form.available == undefined || 
      this.state.form.isIntervened == undefined
    ) {

      this.setState({
        loading: false,
        error: null,
        success: null,
        missedValue: true,
        success: null,
      });

    } else {

      this.setState({
        loading: true,
        error: null
      });
      try {
        this.state.form.uuidBike = this.props.match.params.uuidBike
        const response = await api.bike.update(this.state.form);
        if (response.message == "Actualización Correcta") {
          this.setState({ loading: false, success: response.message });
        } else {
          this.setState({ loading: false, missedValue: false });
        }
      } catch (error) {
        this.setState({ loading: false, error: error, missedValue: false });
      }

    }
  };

  handleOnSuccess = async e => {
    this.props.history.push('/panelBikes')
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

  handleChangeSelect = (selectedOption) => {
    if(selectedOption.name == "available"){
        this.setState({
        form: {
          ...this.state.form,
          available: selectedOption.value
        }
      });
    }else{
        this.setState({
            form: {
              ...this.state.form,
              isIntervened: selectedOption.value
            }
          });
    }
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
        <ModalEliminarBikes
          isOpen={this.state.modalDeleteIsOpen}
          onClose={this.handleModalEliminar}
          onDeleteStation={this.deleteItem}
        />

        <br />
        <h3>Editar datos de bicicleta</h3>
        <br /><br />


        <Form onSubmit={this.handleSubmit}>
          <div className="row"  >

            <FormGroup className="mr-4">
              <Label for="latitude">Latitud</Label>
              <Input
                onChange={this.handleChange}
                type={'number'} step={'.0000001'}
                value={this.state.form.latitude}
                name="latitude" id="latitude" placeholder="Latitud" required />
            </FormGroup>
            <br />

            <FormGroup>
              <Label for="longitude">Longitud</Label>
              <Input
                onChange={this.handleChange}
                type={'number'} step={'.0000001'}
                defaultValue={this.state.form.longitude}
                id="longitude" placeholder="Longitud" required />
            </FormGroup>
          </div>

          <FormGroup className="mr-4">
            <Label for="available">Disponibilidad</Label>
            <Select
              value={optionsAvailable.filter(({value}) => value === this.state.form.available)}
              onChange={this.handleChangeSelect}
              autoFocus={true}
              options={optionsAvailable}
            />
          </FormGroup>
          
          <FormGroup className="mr-4">
            <Label for="isIntervened">Bloqueo</Label>
            <Select
              value={optionsIntervened.filter(({value}) => value === this.state.form.isIntervened)}
              onChange={this.handleChangeSelect}
              autoFocus={true}
              options={optionsIntervened}
            />
          </FormGroup>

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
        <br />
      </div>
    );

  }
}

export default EditarBike;