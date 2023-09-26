import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

function AlertaModal({ titulo, duracion=2, estado, mensaje, show, onHide }) {
  useEffect(() => {
    if (show) {
      // Configurar un temporizador para ocultar automáticamente el modal después de la duración especificada
      const timer = setTimeout(() => {
        onHide(); // Llama a la función onHide para ocultar el modal
      }, duracion * 1000);

      // Limpia el temporizador cuando el componente se desmonta o cuando show cambia a false
      return () => clearTimeout(timer);
    }
  }, [show, onHide, duracion]);

  return (
    <Modal
      size="sm"
      show={show}
      onHide={onHide}
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
        <picture>
          <img
            src={`/img/aviso_${estado}.svg`}
            alt=""
          />
        </picture>
        {mensaje}
      </Modal.Body>
    </Modal>
  );
}

export default AlertaModal;
