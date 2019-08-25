import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactDOM from 'react-dom';

import '../../components/modal.jsx';

function ModalEliminarStation(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="DeleteBadgeModal">
        <br />
        <h1>Eliminar estación</h1>

        <p>¿Seguro que deseas eliminar esta estación?</p>
        <div>
          <button onClick={props.onClose} className="btn btn-warning mr-4">Cancelar</button>
          <button onClick={props.onDeleteStation} className="btn btn-success mr-4">Eliminar</button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalEliminarStation;