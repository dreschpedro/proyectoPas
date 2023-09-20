"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import Imagen from '@/components/pruebaImagen/imagen';


function RegistroOrganizacions() {


  const [selectedRol, setSelectedRol] = useState('');
  const [Organizaciones, setOrganizaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState((""));


  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    imagen: '',
    telefono: '',
    direccion: '',
    descripcion: ''
  });

  useEffect(() => {
    instance.get('/organizaciones/')
      .then((response) => {
        console.log('Respuesta del backend:', response.data);
        setOrganizaciones(response.data);
      })
      .catch((error) => console.error('Error al obtener las Organizaciones:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Agregar console.log para verificar los datos antes de enviarlos
    console.log('Datos a enviar al backend:', formData);

    try {
      // Registrar una nueva Organizacion
      const userResponse = await instance.post('/organizaciones/registrar', {
        nombre: formData.nombre,
        email: formData.email,
        imagen: formData.imagen,
        telefono: formData.telefono,
        direccion: formData.direccion,
        descripcion: formData.descripcion,
      });

      console.log('Organizacion registrada exitosamente:', userResponse.data);
    } catch (error) {
      console.error('Error al registrar la Organizacion:', error);
    }
  };
  const handleImageChange = (e) => {
    console.log("Imagen seleccionada"); // Agrega esto para verificar si la función se ejecuta

    const file = e.target.files;
    setSelectedFile(file);
    setFormData((prevData) => ({
      ...prevData,
      imagen: file,
    }));
  };



  const handleInputChange = (e) => {

    const file = e.target.files;
    setSelectedFile(file);

    const { name, value } = e.target;
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

            <Form.Group controlId="formDescripcion">
              <Form.Group
                // className="mb-3"
                controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Email*</Form.Label> */}
                <Form.Control
                  className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="textarea"
                  name="descripcion"
                  value={formData.descripcion}
                  required
                  onChange={handleInputChange}
                  placeholder="Descripción" />
              </Form.Group>
            </Form.Group>

            <Imagen />

          </Col>
          <Col md={{ order: 'last' }} xs={{ order: 'first' }}>

            {/* imagen de la Organización */}

            <Form.Group controlId="formFile">
              <Form.Group className="d-flex align-items-center imagebutton">
                <FontAwesomeIcon
                  icon={faFileImage}
                  className="imageIcon" />
                <Form.Control
                  name="imagen"
                  className="d-none shadow border border-secondary rounded rounded-1.1 shadow mb-4"
                  type="file"
                  onChange={handleImageChange} // Agrega una nueva función para manejar la carga de imágenes
                />

              </Form.Group>
              <Form.Label className='d-flex justify-content-center mb-5'>Seleccionar imagen del Organismo</Form.Label>
            </Form.Group>

          </Col>
        </Row>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
          <Link style={{
            textDecoration: 'none',
            color: '#22096F',
          }} href={"/admin/registros/organizaciones"}>
            <button className='bouttoncancel' style={{}}>
              Cancelar
            </button>
          </Link>

          <button
            className='buttonRegistrar'
            style={{ whiteSpace: 'nowrap', width: '190px' }}
            type="submit">
            Registrar Organización
          </button>
        </div>
      </Form >
    </>
  );
}

export default RegistroOrganizacions;