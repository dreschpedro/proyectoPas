"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3005/api/',
  timeout: 1000,
  headers: { 'Accept': 'application/json' } // Agregar cualquier header necesario
});

const PerfilInstitucion = () => {
  const [institucionData, setInstitucionData] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    descripcion: '',
  });

  useEffect(() => {
    // Simulamos una llamada a la API para obtener los datos de la institución
    // Puedes reemplazar esto con una llamada real a la API utilizando el ID de la institución
    const ejemploInstitucion = {
      id: 1,
      nombre: 'Institución de Ejemplo',
      logo: 'ruta_de_la_imagen.jpg',
      direccion: 'Calle Ejemplo, Ciudad de Ejemplo',
      telefono: '+54 9 123456789',
      email: 'institucion@example.com',
      descripcion: 'Esta es la descripción de la Institución de Ejemplo',
    };

    setInstitucionData(ejemploInstitucion);
  }, []);

  useEffect(() => {
    setFormData({
      nombre: institucionData.nombre,
      direccion: institucionData.direccion,
      telefono: institucionData.telefono,
      email: institucionData.email,
      descripcion: institucionData.descripcion,
    });
  }, [institucionData]);

  const handleImageUpload = (event) => {
    // Lógica para manejar la carga de la imagen del logo (opcional)
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realizar la lógica para guardar los cambios en la API utilizando formData
      // Puedes usar formData.nombre, formData.direccion, etc.
      // Simulamos una respuesta exitosa de la API
      const response = await instance.post('institucion/actualizar', formData);

      console.log('Respuesta del backend:', response.data);
      setEditing(false); // Desactivar el modo de edición después de guardar los cambios
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>{editing ? 'Editar Perfil de la Institución' : 'Perfil de la Institución'}</h1>

      <Form.Group controlId="formLogo">
        <Form.Label>Logo de la Institución</Form.Label>
        <br />
        <img
          src={institucionData.logo || 'ruta_de_la_imagen_default.jpg'}
          alt={institucionData.nombre}
          style={{ maxWidth: '200px' }}
        />
        {editing && <Form.Control type="file" name="logo" onChange={handleImageUpload} />}
      </Form.Group>

      <Form.Group controlId="formNombre">
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Nombre
          </InputGroup.Text>
          <Form.Control
            name='nombre'
            aria-label="Nombre"
            aria-describedby="inputGroup-sizing-default"
            value={formData.nombre}
            placeholder="Ingresa el nombre de la Institución"
            required
            readOnly={!editing}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formDireccion">
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Dirección
          </InputGroup.Text>
          <Form.Control
            name='direccion'
            aria-label="Dirección"
            aria-describedby="inputGroup-sizing-default"
            value={formData.direccion}
            placeholder="Ingresa la dirección de la Institución"
            required
            readOnly={!editing}
            onChange={handleChange}
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
            name='telefono'
            aria-label="Número de contacto"
            aria-describedby="inputGroup-sizing-default"
            value={formData.telefono}
            placeholder="Ingresa el número de contacto"
            required
            readOnly={!editing}
            onChange={handleChange}
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
            name="email"
            aria-label="Email corporativo"
            aria-describedby="inputGroup-sizing-default"
            value={formData.email}
            placeholder="Ingresa el email corporativo"
            required
            readOnly={!editing}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formDescripcion">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Descripción general de la Institución
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            name='descripcion'
            rows={5}
            aria-label="Descripción general de la Institución"
            aria-describedby="inputGroup-sizing-default"
            value={formData.descripcion}
            placeholder="Ingresa una descripción general de la Institución"
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

export default PerfilInstitucion;
