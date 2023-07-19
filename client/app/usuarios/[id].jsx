"use client"
import React from 'react';
import { Table } from 'react-bootstrap';
import { Form, Button, InputGroup } from 'react-bootstrap';

function RegistroUsuarios() {
  const roles = ['Data-Entry', 'Administrador', 'Consultor'];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Crea una cuenta de P.A.S</h1>
      <Form.Group controlId="formUsername">
        <InputGroup className="mb-3 mt-5">
          <InputGroup.Text id="inputGroup-sizing-default">
            Nombre de usuario
          </InputGroup.Text>
          <Form.Control
            aria-label="Nombre de usuario"
            aria-describedby="inputGroup-sizing-default"
            placeholder=""
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Contraseña
          </InputGroup.Text>
          <Form.Control
            type="password"
            aria-label="Contraseña"
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Confirmar Contraseña
          </InputGroup.Text>
          <Form.Control
            type="password"
            aria-label="Confirmar Contraseña"
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formInstitucion">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Institución
          </InputGroup.Text>
          <Form.Control
            aria-label="Institución"
            aria-describedby="inputGroup-sizing-default"
            placeholder=""
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formRol">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Rol
          </InputGroup.Text>
          <Form.Control as="select" required>
            {roles.map((rol, index) => (
              <option key={index}>{rol}</option>
            ))}
          </Form.Control>
        </InputGroup>
      </Form.Group>



      <Form.Group controlId="formEmail">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Email
          </InputGroup.Text>
          <Form.Control
            type="email"
            aria-label="Email"
            aria-describedby="inputGroup-sizing-default"
            placeholder=""
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formCuil">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            CUIL/CUIT
          </InputGroup.Text>
          <Form.Control
            aria-label="CUIL/CUIT"
            aria-describedby="inputGroup-sizing-default"
            placeholder=""
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formNombres">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Nombres y Apellidos
          </InputGroup.Text>
          <Form.Control
            aria-label="Nombres y Apellidos"
            aria-describedby="inputGroup-sizing-default"
            placeholder=""
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formTelefono">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Teléfono
          </InputGroup.Text>
          <Form.Control
            type="tel"
            aria-label="Teléfono"
            aria-describedby="inputGroup-sizing-default"
            placeholder=""
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formDomicilio">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Domicilio
          </InputGroup.Text>
          <Form.Control
            aria-label="Domicilio"
            aria-describedby="inputGroup-sizing-default"
            placeholder=""
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formProfesion">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Profesión
          </InputGroup.Text>
          <Form.Control
            aria-label="Profesión"
            aria-describedby="inputGroup-sizing-default"
            placeholder=""
            required
          />
        </InputGroup>
      </Form.Group>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="primary" type="submit" style={{ width: '200px', fontWeight: 'bold' }}>
          Registrarse
        </Button>
      </div>
    </Form>
  );
}

export default RegistroUsuarios;
