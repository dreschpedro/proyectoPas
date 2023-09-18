"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

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
        nombre: FormData.nombre,
        email: FormData.email,
        imagen: FormData.imagen,
        telefono: FormData.telefono,
        direccion: FormData.direccion,
      });

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
                {/* <Form.Label>Nombre de la Organización*</Form.Label> */}
                <Form.Control
                className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  required
                  onChange={handleInputChange}
                  placeholder="Nombre de la Organización" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formDomicilio">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Dirección*</Form.Label> */}
                <Form.Control
                className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  required
                  onChange={handleInputChange}
                  placeholder="Dirección" />
              </Form.Group>
            </Form.Group>


            <Form.Group controlId="formNumber">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Número de Teléfono*</Form.Label> */}
                <Form.Control
                className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="number"
                  name="telefono"
                  value={formData.telefono}
                  required
                  onChange={handleInputChange}
                  placeholder="Número de Teléfono" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Email*</Form.Label> */}
                <Form.Control
                className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleInputChange}
                  placeholder="Email" />
              </Form.Group>
            </Form.Group>

          </Col>

          {/* <Col md>
          </Col> */}

          {/* imagen de la Organización */}
          <Col md={{ order: 'last' }} xs={{ order: 'first' }}>

            {/* <Form.Group controlId="formFile">
              <Form.Label>Subir imagen</Form.Label>
              <Form.Control
                type="file"
                name="imagen"
                value={formData.imagen}
                onChange={handleImageUpload} />
            </Form.Group> */}


<Form.Group controlId="formFile">

<div className="d-flex align-items-center imagebutton">
  <FontAwesomeIcon icon={faFileImage} className="imageIcon" />
  <Form.Control

    type="file"
    name="imagen"
    className="d-none shadow border border-secondary rounded rounded-1.1 shadow mb-4"
    onChange={handleImageUpload}
  />
</div>
<Form.Label className='d-flex justify-content-center mb-5'>Seleccionar imagen del Organismo</Form.Label>
</Form.Group>

          </Col>
        </Row>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
        <Link style={{
              textDecoration:'none',
              color: '#22096F',
            }} href={"/admin/registros/organizaciones"}>
          <button className='bouttoncancel' style={{}}>
            Cancelar
          </button>
          </Link>

          <button className='buttonRegistrar' style={{ whiteSpace: 'nowrap', width:'190px' }} type="submit">
            Registrar Organización
          </button>
        </div>
      </Form>
    </>
  );
}

export default RegistroOrganizacions;
