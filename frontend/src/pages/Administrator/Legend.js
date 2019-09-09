import React from "react";

import "../../components/styles/Legend.css";
import Pin from "./pin"


const Legend = () => (
  <div className="legend">
    <h1 className="legend__title"></h1>
    <div className="legend-line">
      <span>
      <Pin size={20} tipo={1} /> Incidentes
      </span>
    </div>
    <br/>
    <div className="legend-line">
      <span>
      <Pin size={20} tipo={2} /> Estacionamientos
      </span>
    </div>
    <br/>
    <div className="legend-line">
      <span>
      <Pin size={20} tipo={3} /> Bicicletas
      </span>
    </div>
  </div>
);

export default Legend;