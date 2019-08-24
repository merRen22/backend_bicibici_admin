import React from "react";
import classnames from "classnames";
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import PanelStations from "./panelStations";
import PageLoading from "../../components/pageLoading"
import PageError from "../../components/pageError"

class PanelStationsContainer extends React.Component {
    
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalEditarIsOpen: false,
    modalDeleteIsOpen: false,
  };
  
  componentDidMount() {
    //this.fetchData();
  }
  
  fetchData = async () => {
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


  render() {
      if (this.state.loading) {
        return <PageLoading />;
      }
  
      if (this.state.error) {
        return <PageError error={this.state.error} />;
      }

      
    return (
        <PanelStations
        />
      );

}
}

export default PanelStationsContainer;