import React from "react";
import ReactMapGL, { Marker,Popup } from "react-map-gl";
import api from "../../api";
import Pin from "./pin"
import Legend from "./Legend";
import ItemInfo from './itemInfo';
import { Badge } from "reactstrap";

class HomeAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataGlobal: [],
      viewport: {
        latitude: -12.073268,
        longitude: -77.080615,
        zoom: 13,
        width: "100vw",
        height: "90vh",
        startDragLngLat: null,
        isDragging: null
      },
      mapStyle: "mapbox://styles/mapbox/streets-v9",
      popupInfo: null
    };
  }

  fetchData = async () => {
    setInterval(async arg  => {

      try {
        const response = await api.map.mapElements();
  
        response.bikes[0].Items.map((e)=>{
          this.state.dataGlobal.push({
            latitude: e.latitude,
            longitude: e.longitude,
            uuid: e.uuidBike,
            data: ``,
            tipo: 3,
          });
        })
  
        response.stations[0].Items.map((e)=>{
          this.state.dataGlobal.push({
            latitude: e.latitude,
            longitude: e.longitude,
            uuid: e.uuidStation,
            data: `Espacios libres : ${e.availableSlots}`,
            tipo: 2,});
        })
  
        response.reports[0].Items.map((e)=>{
          this.state.dataGlobal.push({
            latitude: e.latitude,
            longitude: e.longitude,
            uuid: e.uuidReport,
            data: `${e.description}`,
            tipo: 1,});
        })
  
        this.setState({
          loading: false
        });
      } catch (error) {
        this.setState({ loading: false, error: error });
      }
    }, 5000);
  };

  componentDidMount() {
    this.fetchData();
  }

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <ItemInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { mapStyle, viewport } = this.state;
    return (
      <div>
        <ReactMapGL
          mapboxApiAccessToken=""
          mapStyle={mapStyle}
          ref={map => (this.map = map)}
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
        >

          {this.state.dataGlobal == [] ? (
            <div />
          ) : (
            this.state.dataGlobal.map(obj => {
              return (
                <Marker
                key={obj.uuid}
                  latitude={parseFloat(obj.latitude.toString())}
                  longitude={parseFloat(obj.longitude.toString())}
                  offsetTop={-20}
                  offsetLeft={-10}
                >
                  <Pin 
                  size={20} 
                  tipo={obj.tipo}
                  onClick={() => this.setState({popupInfo: obj})}
                   />
                </Marker>
              );
            })
          )}

        {this._renderPopup()}
          <Legend/>
        </ReactMapGL>
      </div>
    );
  }
}
export default HomeAdmin;