import React from "react";
import api from "../../api";

import PageLoading from "../../components/pageLoading";
import ReportList from '../../components/report/reportList'

import {
  Card,
  CardBody,
  CardSubtitle,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

class ReportScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataBikes: undefined,
      dataStations: undefined,
      dataReports: undefined,
      dataUsers: undefined,
      totalBikes: undefined,
      totaUsers: undefined,
      pages: 0,
      actualPage: 1
    };
  }

  handleReportSolve = (index) => {
    var req = {uuidReport: this.state.dataReports[index].uuidReport} 
    api.report.closeReport(req);
    
    this.state.dataReports.splice(index,1)
    this.setState({
      pages : Math.ceil(Math.ceil(this.state.dataReports.length/3,0))
    });
  };

  handlePreviousPage = async e => {
    this.setState({
      actualPage: this.state.actualPage == 1 ? 1 : this.state.actualPage - 1
    });
  };

  handleNextPage = async e => {
    this.setState({
      actualPage:
        this.state.actualPage == this.state.pages
          ? this.state.pages
          : this.state.actualPage + 1
    });
  };

  fetchData = async () => {
    try {
      const response = await api.report.reportElements();
      this.state.pages = Math.ceil(Math.ceil(response.reports[0].Count/3,0))
      
      this.state.dataBikes = response.bikes[0].Count;
      this.state.dataUsers = response.users[0].Count;
      this.state.totalBikes = response.bikes[0].ScannedCount;
      this.state.totaUsers = response.users[0].ScannedCount;
      this.state.dataStations = response.stations[0].Count;
      this.setState({
        dataReports: response.reports[0].Items,
        loading: false
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <div className="row">
        <div className="col-1"></div>
        <div className="col-4">
          <br />
          <h3>Bicicletas y Estaciones</h3>
          <br />
          <Card>
            <CardBody>
              <br />
              <CardSubtitle>
                Bicicletas en uso{" "}
                {this.state.dataBikes == undefined ? 0 : this.state.dataBikes}
                {" / "}
                {this.state.totalBikes}
              </CardSubtitle>
              <br />
              <CardSubtitle>
                Estaciones{" "}
                {this.state.dataStations == undefined? 0: this.state.dataStations}
              </CardSubtitle>
            </CardBody>
          </Card>

          <br />
          <h3>Membresias Activas</h3>
          <br />
          <Card>
            <CardBody>
              <br />
              <CardSubtitle>
                cuentas activas
                {" "}
                {this.state.dataUsers == undefined ? 0 : this.state.dataUsers}
                {" / "}
                  {this.state.totaUsers}
              </CardSubtitle>
            </CardBody>
          </Card>
        </div>
        <div className="col-1"></div>
        <div className="col-5">
          <br />
          <div className="row">
          <h3 className="col-8">Incidentes</h3>

          <Pagination className="col-4" aria-label="Page navigation example">
              <PaginationItem className="mr-4">
                <PaginationLink
                  onClick={this.handlePreviousPage}
                  previous
                ></PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  onClick={this.handleNextPage}
                  next
                ></PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
          
          <div className="row justify-content-center">
          <div className="col-12 vCenterItems container">
            <div className="itemsList__container">
              <ReportList 
              onReportSolve = {this.handleReportSolve}
              reports={
                this.state.dataReports.slice(
                  this.state.actualPage>1
                    ?(this.state.actualPage - 1)*3
                    :0,
                  this.state.actualPage == this.state.pages
                    ?this.state.actualPage*3 + 2
                    :this.state.actualPage*3
                )
                }/>
            </div>
          </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    );
  }
}
export default ReportScreen;
