import React from 'react';
import { Modal, } from 'reactstrap';

import '../../../components/modal.jsx';

function ModalEliminarBike(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="DeleteBadgeModal">
        <br />
        <h3>Eliminar bicicleta</h3>

        <p>¿Seguro que deseas eliminar esta bicicleta?</p>
        <div>
          <button onClick={props.onClose} className="btn btn-warning mr-4">Cancelar</button>
          <button onClick={props.onDeleteStation} className="btn btn-success mr-4">Eliminar</button>
        </div>
        <br />
      </div>
    </Modal>
  );
}

export default ModalEliminarBike;