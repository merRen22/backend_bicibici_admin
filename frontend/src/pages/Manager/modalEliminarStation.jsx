import React from 'react';
import { Modal, } from 'reactstrap';

import '../../components/modal.jsx';

function ModalEliminarStation(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="DeleteBadgeModal">
        <br />
        <h3>Eliminar estación</h3>

        <p>¿Seguro que deseas eliminar esta estación?</p>
        <div>
          <button onClick={props.onClose} className="btn btn-warning mr-4">Cancelar</button>
          <button onClick={props.onDeleteStation} className="btn btn-success mr-4">Eliminar</button>
        </div>
        <br />
      </div>
    </Modal>
  );
}

export default ModalEliminarStation;