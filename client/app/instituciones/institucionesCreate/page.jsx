"use client"
import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance from '@/app/axiosConfig'; // Importa tu instancia personalizada de Axios

function RegistroInstituciones() {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    descripcion: '',
    imagen: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('direccion', formData.direccion);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('imagen', formData.imagen);

      // Agrega los siguientes console.log para verificar los datos antes de la solicitud
      console.log('Datos a enviar:', {
        nombre: formData.nombre,
        direccion: formData.direccion,
        telefono: formData.telefono,
        email: formData.email,
        descripcion: formData.descripcion,
        imagen: formData.imagen,
      });

      const response = await instance.post('institucion/registrar', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.error('Error al registrar la Organización:', error.message);
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
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Registrar Organización</h1>

      <Form.Group controlId="formLogo">
        <Form.Label>Subir imagen o logo de la Organización</Form.Label>
        <Form.Control type="file" name="imagen" onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formNombre">
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Nombre
          </InputGroup.Text>
          <Form.Control
            type="text"
            name='nombre'
            aria-label="Nombre"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ingresa el nombre de la Organización"
            required
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
            type="text"
            name='direccion'
            aria-label="Dirección"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ingresa la dirección de la Organización"
            required
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
            placeholder="Ingresa el número de contacto"
            required
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
            placeholder="Ingresa el email corporativo"
            required
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formDescripcion">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Descripción general de la Organización
          </InputGroup.Text>
          <Form.Control
            type="text"
            as="textarea"
            name='descripcion'
            rows={5}
            aria-label="Descripción general de la Organización"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Ingresa una descripción general de la Organización"
            required
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <Button variant="primary" type="submit" style={{ width: '200px', fontWeight: 'bold' }}>
        Registrar Organización
      </Button>
    </Form>
  );
}

export default RegistroInstituciones;
