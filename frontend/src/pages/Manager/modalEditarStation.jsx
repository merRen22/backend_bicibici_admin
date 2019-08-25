import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactDOM from 'react-dom';

import '../../components/modal.jsx';

function ModalEditarStation(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="DeleteBadgeModal">
        <br />
        <h1>Editar estación</h1>

        <p>¿Seguro que deseas eliminar esta estación?</p>
        <div>
          <button onClick={props.onClose} className="btn btn-warning mr-4">Cancelar</button>
          <button onClick={props.onDeleteBadge} className="btn btn-success mr-4">Editar</button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalEditarStation;