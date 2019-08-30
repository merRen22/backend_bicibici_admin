import React from "react";

import api from '../../../api.js'

import PanelPlans from "./panelPlans";
import PageLoading from "../../../components/pageLoading"
import PageError from "../../../components/pageError"

class PanelPlansContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    pages: 0,
    actualPage: 1,
    form: {
      query: '',
    }
  };

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData = async () => {
    try {
      const data = await api.plans.list();
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

  handleSearch = async e => {
    this.setState({ 
      loading: true, 
      error: null,
      pages: 0,
      actualPage: 1,
     });
    try {
      var request = {"name":this.state.form.query}
      const data = await api.plans.listByName(request);
      this.state.pages = Math.ceil(Math.ceil(data.Count/4,0))
      
      this.setState({ 
        loading: false,
         data: data.Items });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
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

    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={"Hubo un problema al obtener los datos, intentelo en otro momento 😢"} />;
    }

    return (
      <PanelPlans
        onChange = {this.handleChange}
        onSeachItem = {this.handleSearch}
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

export default PanelPlansContainer;