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
import ModalEliminarAccount from "./modalEliminarAccount";
import PageSuccess from "../../../components/pageSuccess"
import Select, { components } from 'react-select'

const options = [
  { value: 'G', label: 'Gestor' },
  { value: 'A', label: 'Administrador' }
];

class EditarAccount extends React.Component {
  state = {
    loading: true,
    error: null,
    modalDeleteIsOpen: false,
    data: undefined,
    success: null,
    missedValue: false,
    dropdownOpen: false,
    form: {
      uuidAccount: '',
      email: '',
      password: '',
      typeAccount: ''
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      var uuidAccount = { "uuidAccount": this.props.match.params.uuidAccount }
      const data = await api.accounts.read(uuidAccount);
      this.state.form.email = data.Items[0].email
      this.state.form.password = data.Items[0].password
      this.state.form.typeAccount = data.Items[0].typeAccount
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
      var uuidAccount = { "uuidAccount": this.props.match.params.uuidAccount };
      const data = await api.accounts.remove(uuidAccount);
      this.props.history.push('/panelAccounts')
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();

    if (
      this.state.form.email == "" ||
      this.state.form.password == "" ||
      this.state.form.typeAccount == ""
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
        this.state.form.uuidAccount = this.props.match.params.uuidAccount
        const response = await api.accounts.update(this.state.form);
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
    this.props.history.push('/panelAccounts')
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
    this.setState({
      form: {
        ...this.state.form,
        typeAccount: selectedOption.value
      }
    });
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
        <ModalEliminarAccount
          isOpen={this.state.modalDeleteIsOpen}
          onClose={this.handleModalEliminar}
          onDeleteStation={this.deleteItem}
        />

        <br />
        <h3>Editar cuenta de usuario</h3>
        <br /><br />


        <Form onSubmit={this.handleSubmit}>
          <div className="row"  >

            <FormGroup className="mr-4">
              <Label for="email">Correo</Label>
              <Input
                onChange={this.handleChange}
                value={this.state.form.email}
                type="email" name="email" id="email" placeholder="correo" required />
            </FormGroup>
            <br />

            <FormGroup>
              <Label for="password">Clave</Label>
              <Input
                onChange={this.handleChange}
                defaultValue={this.state.form.password}
                type="text"
                name="password" id="password" placeholder="Clave" required />
            </FormGroup>
          </div>

          <FormGroup className="mr-4">
            <Label for="typeAccount">Tipo de cuenta</Label>
            <Select
              value={options.filter(({value}) => value === this.state.form.typeAccount)}
              onChange={this.handleChangeSelect}
              autoFocus={true}
              options={options}
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

export default EditarAccount;