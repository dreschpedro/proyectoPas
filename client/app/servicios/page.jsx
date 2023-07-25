"use client"
import React, { useState } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import Link from 'next/link';

const RegistroServiciosRealizados = () => {
  // State para el manejo de la ventana modal
  const [showModal, setShowModal] = useState(false);

  // State y funciones para manejar los datos del servicio a registrar
  const [selectedService, setSelectedService] = useState('');
  const [serviceInfo, setServiceInfo] = useState({
    dni: '',
    fechaNacimiento: '',
    ocupacion: '',
    domicilioReal: '',
    hijos: '',
    trabajo: '',
    subsidio: '',
    institucion: '', // Combobox para la institución que realiza el servicio
  });

  // Funciones para manejar el mostrar y cerrar la ventana modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el registro del servicio realizado
    console.log("Información del servicio realizado:", {
      selectedService,
      ...serviceInfo,
    });
    // Luego, puedes enviar los datos al backend para almacenarlos en la base de datos
    // y realizar otras operaciones necesarias
    handleCloseModal();
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
        <Form.Group controlId="formInstitucion">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Institución
            </InputGroup.Text>
            <Form.Control
              as="select"
              value={serviceInfo.institucion}
              onChange={(e) => setServiceInfo({ ...serviceInfo, institucion: e.target.value })}
              required
            >
              <option value="">Seleccionar Institución</option>
              <option value="Institución 1">Institución 1</option>
              <option value="Institución 2">Institución 2</option>
              {/* Agrega aquí más opciones de instituciones */}
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
              <Form.Control type="text" placeholder="Ingrese el nombre del servicio" />
            </Form.Group>
            <Form.Group controlId="formServiceDescription">
              <Form.Label>Descripción del Servicio</Form.Label>
              <Form.Control as="textarea" placeholder="Ingrese una descripción del servicio" rows={3} />
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
