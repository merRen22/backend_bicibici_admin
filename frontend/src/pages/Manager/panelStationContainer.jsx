import React from "react";

import api from '../../api.js'

import PanelStations from "./panelStations";
import PageLoading from "../../components/pageLoading"
import PageError from "../../components/pageError"

class PanelStationsContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    modalEditarIsOpen: false,
    modalDeleteIsOpen: false,
    data: undefined,
    indexStation:0,
    dataPages: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const data = await api.stations.list();
      
      this.setState({ 
        loading: false,
         data: data,
         dataPages : Array.from({ length: data.pages }, (v, i) => i + 1) });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  
  handleModalEditar = e => {
    this.setState({ 
      modalEditarIsOpen: !this.state.modalEditarIsOpen
    });
  };


  render() {

    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={"Hubo un problema al obtener los datos, intentelo en otro momento 😢"} />;
    }

    return (
      <PanelStations
        modalEditarIsOpen={this.state.modalEditarIsOpen}
        modalDeleteIsOpen={this.state.modalDeleteIsOpen}
        data={this.state.data}
        dataPages={this.state.dataPages}
        toggleModalEditar={this.handleModalEditar}
        toggleModalEliminar={this.handleModalEliminar}
      />
    );

  }
}

export default PanelStationsContainer;