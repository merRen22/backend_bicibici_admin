import React from 'react';
import {
    Form,
    FormGroup,
    Alert,
    Label,
    Input
} from 'reactstrap';

import api from '../../../api.js'

import '../../../components/modal.jsx';
import PageLoading from "../../../components/pageLoading"
import PageError from "../../../components/pageError"
import PageSuccess from "../../../components/pageSuccess"
import Select, { components } from 'react-select'

const options = [
    { value: 'G', label: 'Gestor' },
    { value: 'A', label: 'Administrador' }
];

class RegistrarAccount extends React.Component {
    state = {
        loading: false,
        error: null,
        success: null,
        modalDeleteIsOpen: false,
        data: undefined,
        missedValue: false,
        dropdownOpen: false,

        form: {
            email: '',
            password: '',
            typeAccount: ''
        },
    };

    componentDidMount() {
    }


    toggle = async e => {
        this.setState({
            dropdownOpen: !this.dropdownOpen
        });
    }

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
                missedValue: true
            });

        } else {

            this.setState({ loading: true, error: null });
            try {
                var response = await api.accounts.create(this.state.form);
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

    handleChangeSelect = (selectedOption) => {
        this.setState({
            form: {
                ...this.state.form,
                typeAccount: selectedOption.value
            }
        });
    }

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
                <h3>Registrar nuevo trabajador</h3>
                <br /><br />


                <Form onSubmit={this.handleSubmit}>
                    <div className="row">

                        <FormGroup className="mr-4">
                            <Label for="email">Correo</Label>
                            <Input
                                onChange={this.handleChange}
                                type="email" name="email" id="email" placeholder="correo" required />
                        </FormGroup>
                        <br />

                        <FormGroup>
                            <Label for="password">Clave</Label>
                            <Input
                                type="text"
                                onChange={this.handleChange}
                                name="password" id="password" placeholder="Clave" required />
                        </FormGroup>
                    </div>

                        <FormGroup>
                            <Label for="typeAccount">Tipo de cuenta</Label>
                            <Select
                                onChange={this.handleChangeSelect}
                                autoFocus={true}
                                options={options}
                            />

                        </FormGroup>

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

export default RegistrarAccount;