"use client"
import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const handleImageUpload = (event) => {
  // Lógica para manejar la carga de la imagen
};

function RegistroInstituciones() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
  };

  return (
    <Form onSubmit={handleSubmit}>

      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Registrar Institución</h1>

      <Form.Group controlId="formLogo">
        <Form.Label>Subir imagen o logo de la institución</Form.Label>
        <Form.Control type="file" onChange={handleImageUpload} />
      </Form.Group>

      <Form.Group controlId="formDireccion">
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Dirección
          </InputGroup.Text>
          <Form.Control
            aria-label="Dirección"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ingresa la dirección de la institución"
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formContacto">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Número de teléfono
          </InputGroup.Text>
          <Form.Control
            type="tel"
            aria-label="Número de contacto"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ingresa el número de contacto"
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Email corporativo
          </InputGroup.Text>
          <Form.Control
            type="email"
            aria-label="Email corporativo"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ingresa el email corporativo"
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formDescripcion">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Descripción general de la institución
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            rows={5}
            aria-label="Descripción general de la institución"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ingresa una descripción general de la institución"
            required
          />
        </InputGroup>
      </Form.Group>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="primary" type="submit" style={{ width: '200px', fontWeight: 'bold' }}>
          Registrar Institución
        </Button>
      </div>
    </Form>
  );
}

export default RegistroInstituciones;
