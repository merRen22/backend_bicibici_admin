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
    pages: 0,
    actualPage: 1
  };

  componentDidMount() {
    this.fetchData();
  }
  

  fetchData = async () => {
    try {
      const data = await api.stations.list();
      this.state.pages = Math.ceil(Math.ceil(data.ScannedCount/4,0))
      
      this.setState({ 
        loading: false,
         data: data.Items });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  
  handlePreviousPage = async e => {
    this.setState({ 
      actualPage : this.state.actualPage == 1?1:this.state.actualPage - 1
    });
  };
  
  handleNextPage = async e => {
    this.setState({ 
      actualPage : this.state.actualPage == this.state.pages?this.state.pages : this.state.actualPage+1
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
        onNextPress = {this.handleNextPage}
        onPreviousPress = {this.handlePreviousPage}
        data={this.state.data.slice(
          this.state.actualPage>1
            ?(this.state.actualPage - 1)*4
            :0,
          this.state.actualPage == this.state.pages
            ?this.state.actualPage*4 + 3
            :this.state.actualPage*4
        )}
      />
    );

  }
}

export default PanelStationsContainer;