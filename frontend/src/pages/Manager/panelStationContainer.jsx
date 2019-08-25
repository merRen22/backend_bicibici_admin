import React from "react";

import api from '../../api.js'

import PanelStations from "./panelStations";
import PageLoading from "../../components/pageLoading"
import PageError from "../../components/pageError"

class PanelStationsContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    modalEditarIsOpen: false,
    modalDeleteIsOpen: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const data = await api.stations.list();
      console.log(data);
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
    /*
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.read(this.props.match.params.badgeId);
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
    */
  };

  
  handleModalEditar = e => {
    this.setState({ modalEditarIsOpen: !this.state.modalEditarIsOpen });
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
      <PanelStations
        modalEditarIsOpen={this.state.modalEditarIsOpen}
        modalDeleteIsOpen={this.state.modalDeleteIsOpen}
        toggleModalEditar={this.handleModalEditar}
        toggleModalEliminar={this.handleModalEliminar}
      />
    );

  }
}

export default PanelStationsContainer;