"use client"
import React, { useState } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import Link from 'next/link';
import instance from '../axiosConfig';

const RegistroServiciosRealizados = () => {
  // State para el manejo de la ventana modal
  const [showModal, setShowModal] = useState(false);

  // State y funciones para manejar los datos del servicio a registrar
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

  
  const [serviceInfo, setServiceInfo] = useState({
    dni: '',
    fechaNacimiento: '',
    ocupacion: '',
    domicilioReal: '',
    hijos: '',
    trabajo: '',
    subsidio: '',
    Organizacion: '', // Combobox para la organizacion que realiza el servicio
  });

  // Funciones para manejar el mostrar y cerrar la ventana modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('descripcion', formData.descripcion);

      console.log('Datos enviados al backend:', formDataToSend);

      const response = await instance.post('/servicios/registrar', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      handleCloseModal(true)

      // Resto del código de manejo de respuesta...
    } catch (error) {
      console.error('Error al registrar el Servicio:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <h1 style={{ marginTop: '20px' }}>Registrar Servicio Realizado</h1>
      <br />


      {/* Botones de Administrar servicios e Historial */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/servicios/crudServicios">
          <Button variant="info" style={{ margin: '10px' }}>
            Administrar Servicios
          </Button>
        </Link>
        <Link href="/servicios/historial">
          <Button variant="secondary" style={{ margin: '10px' }}>
            Historial
          </Button>
        </Link>
      </div>



      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formOrganizacion">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              organizacion
            </InputGroup.Text>
            <Form.Control
              as="select"
              value={serviceInfo.Organizacion}
              onChange={(e) => setServiceInfo({ ...serviceInfo, Organizacion: e.target.value })}
              required
            >
              <option value="">Seleccionar Organizacion</option>
              <option value="organizacion 1">organizacion 1</option>
              <option value="organizacion 2">organizacion 2</option>
              {/* Agrega aquí más opciones de Organizaciones */}
            </Form.Control>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formService">
          <InputGroup className="mb-3 mt-1">
            <InputGroup.Text id="inputGroup-sizing-default">
              Servicio Realizado
            </InputGroup.Text>
            <Form.Control
              as="select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              <option value="">Seleccionar Servicio</option>
              <option value="Servicio 1">Servicio 1</option>
              <option value="Servicio 2">Servicio 2</option>
              {/* Agrega aquí más opciones de servicios */}
            </Form.Control>
            <Button variant="success" onClick={handleShowModal} style={{ marginLeft: '10px' }}>
              Agregar Servicio
            </Button>
          </InputGroup>
        </Form.Group>

        <h2 style={{ textAlign: 'center' }}>Información Socioambiental</h2>

        {/* Información Socioambiental */}
        <Form.Group controlId="formDni">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              DNI
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={serviceInfo.dni}
              onChange={(e) => setServiceInfo({ ...serviceInfo, dni: e.target.value })}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formFechaNacimiento">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Fecha de Nacimiento
            </InputGroup.Text>
            <Form.Control
              type="date"
              value={serviceInfo.fechaNacimiento}
              onChange={(e) => setServiceInfo({ ...serviceInfo, fechaNacimiento: e.target.value })}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formOcupacion">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Ocupación
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={serviceInfo.ocupacion}
              onChange={(e) => setServiceInfo({ ...serviceInfo, ocupacion: e.target.value })}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formDomicilioReal">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Domicilio Real
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={serviceInfo.domicilioReal}
              onChange={(e) => setServiceInfo({ ...serviceInfo, domicilioReal: e.target.value })}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formHijos">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Hijos
            </InputGroup.Text>
            <Form.Control
              type="number"
              value={serviceInfo.hijos}
              onChange={(e) => setServiceInfo({ ...serviceInfo, hijos: e.target.value })}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formTrabajo">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Trabajo
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={serviceInfo.trabajo}
              onChange={(e) => setServiceInfo({ ...serviceInfo, trabajo: e.target.value })}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formSubsidio">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Subsidio
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={serviceInfo.subsidio}
              onChange={(e) => setServiceInfo({ ...serviceInfo, subsidio: e.target.value })}
              required
            />
          </InputGroup>
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="success" type="submit" style={{ width: '200px', fontWeight: 'bold' }}>
            Registrar Servicio
          </Button>
        </div>
      </Form>

      {/* Ventana Modal para Agregar Servicios */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Servicios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formServiceName">
              <Form.Label>Nombre del Servicio</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="" />
            </Form.Group>
            <Form.Group controlId="formServiceDescription">
              <Form.Label>Descripción del Servicio</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Agregar Servicio
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegistroServiciosRealizados;
