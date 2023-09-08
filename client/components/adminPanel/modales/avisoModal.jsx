import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

function avisoModal() {
  return (
    <Modal show={showErrorAlert} onHide={() => setShowErrorAlert(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Ya existe una Organización con este Email !
      </Modal.Body>
    </Modal>
  )
}

export default avisoModal
