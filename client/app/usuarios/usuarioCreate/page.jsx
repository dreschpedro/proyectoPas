"use client"

import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

function RegistroUsuarios() {
  const roles = ['Data-Entry', 'Administrador', 'Consultor'];

  // State para almacenar las instituciones obtenidas del backend
  const [instituciones, setInstituciones] = useState([]);
  // State para almacenar la institución seleccionada
  const [selectedInstitucion, setSelectedInstitucion] = useState('');


  const instance = axios.create({
    baseURL: 'http://localhost:3005/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
  });

  useEffect(() => {
    // Lógica para obtener la lista de instituciones desde el backend utilizando la instancia de axios
    instance.get('/institucion/') // La solicitud se enviará automáticamente a 'http://localhost:3005/api/institucion/'
      .then((response) => {
        console.log('Respuesta del backend:', response.data);
        setInstituciones(response.data);
      })
      .catch((error) => console.error('Error al obtener las instituciones:', error));
  }, []);


  const handleImageUpload = (event) => {
    // Lógica para manejar la carga de la imagen
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario y crear el usuario en el backend
    const formData = new FormData(event.target);
    formData.append('institucion', selectedInstitucion);
    // Luego envías los datos del formulario al backend para registrar el usuario utilizando Axios
    axios.post('/api/usuario/register', formData) // Ruta correcta para registrar el usuario en el backend
      .then((response) => {
        // Aquí puedes manejar la respuesta del backend si es necesario
        console.log('Usuario registrado exitosamente:', response.data);
      })
      .catch((error) => console.error('Error al registrar el usuario:', error));
  };

  return (
    <Form onSubmit={handleSubmit}>

      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Crea una cuenta de P.A.S</h1>

      <Form.Group controlId="formFile">
        <Form.Label>Subir imagen de perfil</Form.Label>
        <Form.Control type="file" onChange={handleImageUpload} />
      </Form.Group>

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

      {/* Combobox para mostrar la lista de instituciones*/}
      <Form.Group controlId="formInstitucion">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
          Organización
          </InputGroup.Text>
          <Form.Control
            as="select"
            value={selectedInstitucion}
            onChange={(e) => setSelectedInstitucion(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecciona una Organización
            </option>
            {instituciones.map((institucion) => (
              <option key={institucion.id_institucion} value={institucion.id_institucion}>
                {institucion.nombre}
              </option>
            ))}
          </Form.Control>
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
