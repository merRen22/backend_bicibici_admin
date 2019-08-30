import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/List.css'
 
class PlansListItem extends React.Component {
    render() {
      return (
        <div className="customListItem">
            <div className="row">
                <div className="col-6">
                    
            <strong className="mr-4">
            Título:   
            </strong>
            <strong>
            {this.props.station.name}
            </strong>
            <br />
            <div className="col">
            <div className="row">
                costo : {this.props.station.cost}
            </div>
            <div className="row">
                Duración (días) : {this.props.station.duration}
            </div>
            </div>
            
            <br />

                </div>
                <div className="col-6">
                    
                    <br/>
                    <div className="row">
                        

                        
                <Link className="btn btn-info" 
                to={`/panelPlansInfo/${this.props.station.uuidPlan}`}>
                    información</Link>
                    <br/>

                    </div>

                </div>
            
          </div>
        </div>
      );
    }
  }

class PlansList extends React.Component {
    render() {
      if (this.props.stations.length === 0) {
        return (
          <div>
            <h3>No hay planes registrados</h3>
          </div>
        );
      }
  
      return (
        <div className="customList">
          <ul className="list-unstyled">
            {this.props.stations.map(obj => {
              return (
                <li key={obj.uuidPlan}>
                    <PlansListItem station={obj} />
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
  
  export default PlansList;
