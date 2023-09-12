import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AlertaModal({ titulo, estado, mensaje }) {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      <Button onClick={() => setSmShow(true)} className="me-2">
        Boton
      </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="alerta-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="alerta-modal-sizes-title-sm">
            {titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <picture >
            <img
              // src="./../../public/img/aviso_{estado}.svg"
              src={`/img/aviso_${estado}.svg`}
              alt=""
            />
          </picture>
          {mensaje}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AlertaModal;