"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance from '@/app/axiosConfig';

const PerfilUsuarios = () => {
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    cuil: '',
    nombres: '',
    telefono: '',
    domicilio: '',
    profesion: '',
  });

  useEffect(() => {
    // Simulamos una llamada a la API para obtener los datos del usuario
    // Puedes reemplazar esto con una llamada real a la API utilizando el ID del usuario
    const ejemploUsuario = {
      id: 1,
      username: 'usuarioejemplo',
      email: 'usuario@example.com',
      cuil: '20345678901',
      nombres: 'Usuario de Ejemplo',
      telefono: '+54 9 123456789',
      domicilio: 'Calle Ejemplo, Ciudad de Ejemplo',
      profesion: 'Profesión de Ejemplo',
    };

    setUserData(ejemploUsuario);
  }, []);

  useEffect(() => {
    setFormData({
      username: userData.username,
      email: userData.email,
      cuil: userData.cuil,
      nombres: userData.nombres,
      telefono: userData.telefono,
      domicilio: userData.domicilio,
      profesion: userData.profesion,
    });
  }, [userData]);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realizar la lógica para guardar los cambios en la API utilizando formData
      // Puedes usar formData.username, formData.email, etc.
      // Simulamos una respuesta exitosa de la API
      const response = await instance.post('usuario/actualizar', formData);

      console.log('Respuesta del backend:', response.data);
      setEditing(false); // Desactivar el modo de edición después de guardar los cambios
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>{editing ? 'Editar Perfil de Usuario' : 'Perfil de Usuario'}</h1>

      <Form.Group controlId="formUsername">
        <InputGroup className="mb-3 mt-5">
          <InputGroup.Text id="inputGroup-sizing-default">
            Nombre de usuario
          </InputGroup.Text>
          <Form.Control
            name='username'
            aria-label="Nombre de usuario"
            aria-describedby="inputGroup-sizing-default"
            value={formData.username}
            placeholder="Ingresa el nombre de usuario"
            required
            readOnly={!editing}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Email
          </InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            aria-label="Email"
            aria-describedby="inputGroup-sizing-default"
            value={formData.email}
            placeholder="Ingresa el email"
            required
            readOnly={!editing}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formCuil">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            CUIL/CUIT
          </InputGroup.Text>
          <Form.Control
            name="cuil"
            aria-label="CUIL/CUIT"
            aria-describedby="inputGroup-sizing-default"
            value={formData.cuil}
            placeholder="Ingresa el CUIL/CUIT"
            required
            readOnly={!editing}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formNombres">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Nombres y Apellidos
          </InputGroup.Text>
          <Form.Control
            name="nombres"
            aria-label="Nombres y Apellidos"
            aria-describedby="inputGroup-sizing-default"
            value={formData.nombres}
            placeholder="Ingresa los nombres y apellidos"
            required
            readOnly={!editing}
            onChange={handleChange}
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
            name="telefono"
            aria-label="Teléfono"
            aria-describedby="inputGroup-sizing-default"
            value={formData.telefono}
            placeholder="Ingresa el número de teléfono"
            required
            readOnly={!editing}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formDomicilio">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Domicilio
          </InputGroup.Text>
          <Form.Control
            name="domicilio"
            aria-label="Domicilio"
            aria-describedby="inputGroup-sizing-default"
            value={formData.domicilio}
            placeholder="Ingresa el domicilio"
            required
            readOnly={!editing}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formProfesion">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Profesión
          </InputGroup.Text>
          <Form.Control
            name="profesion"
            aria-label="Profesión"
            aria-describedby="inputGroup-sizing-default"
            value={formData.profesion}
            placeholder="Ingresa la profesión"
            required
            readOnly={!editing}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

        {editing ? (
          <Button variant="success" type="submit" style={{ width: '200px', fontWeight: 'bold', margin: '5px' }}>
            Guardar Cambios
          </Button>
        ) : (
          <Button variant="warning" onClick={handleEditClick} style={{ width: '200px', fontWeight: 'bold', margin: '5px' }}>
            Modificar
          </Button>
        )}

        <Button variant="danger" type="submit" style={{ width: '200px', fontWeight: 'bold', margin: '5px' }}>
          Eliminar
        </Button>

      </div>
    </Form>
  );
};

export default PerfilUsuarios;
