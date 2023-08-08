"use client"

import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance from '@/app/axiosConfig';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RegistroOrganizacions() {


  const [selectedRol, setSelectedRol] = useState('');
  const [Organizaciones, setOrganizaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    imagen: '',
    telefono: '',
    direccion: '',
  });

  useEffect(() => {
    instance.get('/organizaciones/')
      .then((response) => {
        console.log('Respuesta del backend:', response.data);
        setOrganizaciones(response.data);
      })
      .catch((error) => console.error('Error al obtener las Organizaciones:', error));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = Organizaciones.filter((organizacion) => {
        return (
          organizacion.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredOrganizaciones(filteredData);
    } else {
      setFilteredOrganizaciones([]);
    }
  }, [searchTerm, Organizaciones]);

  const handleImageUpload = async (event) => {
    // Lógica para manejar la carga de la imagen del logo (opcional)
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('logo', imageFile);

    try {
      const response = await instance.post('/organizaciones/subir-imagen', formData);
      const imagePath = response.data.imagePath;
      setOrganizacionData({ ...OrganizacionData, logo: imagePath });
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
  
      // Registrar una nueva Organizacion
      const userResponse = await instance.post('/organizaciones/registrar', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        rol: selectedRol,
      });
      const userId = userResponse.data.id_Organizacion;

      console.log('Organizacion registrada exitosamente:', personalResponse.data);
    } catch (error) {
      console.error('Error al registrar la Organizacion:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 className='titulo'>Crear cuenta</h1>
      <Form onSubmit={handleSubmit} className='bordesito' >

        <Row>
          <Col md>

            <Form.Group controlId="formName">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre de la Organización*</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formDomicilio">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Dirección*</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>


            <Form.Group controlId="formNumber">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Teléfono*</Form.Label>
                <Form.Control
                  type="number"
                  name="telefono"
                  value={formData.telefono}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleInputChange}
                  placeholder="ejemplo@correo.com" />
              </Form.Group>
            </Form.Group>

          </Col>

          <Col md>
          </Col>

          {/* imagen de perfil */}
          <Col md={{ order: 'last' }} xs={{ order: 'first' }}>

            <Form.Group controlId="formFile">
              <Form.Label>Subir imagen de perfil</Form.Label>
              <Form.Control
                type="file"
                name="imagen"
                value={formData.imagen}
                onChange={handleImageUpload} />
            </Form.Group>

          </Col>
        </Row>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
          <button type="submit" className='bouttoncancel'>
            Cancelar
          </button>

          <button className='buttonRegistrar' type="submit">
            Registrar Organización
          </button>
        </div>
      </Form>
    </>
  );
}

export default RegistroOrganizacions;
