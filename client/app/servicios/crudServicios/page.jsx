"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

const ServicesCrud = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    // Otros campos de servicio aquí
  });

  // Datos de ejemplo para simular cuatro servicios
  const servicesData = [
    {
      id: 1,
      name: 'Servicio 1',
      description: 'Descripción del Servicio 1',
    },
    {
      id: 2,
      name: 'Servicio 2',
      description: 'Descripción del Servicio 2',
    },
    {
      id: 3,
      name: 'Servicio 3',
      description: 'Descripción del Servicio 3',
    },
    {
      id: 4,
      name: 'Servicio 4',
      description: 'Descripción del Servicio 4',
    },
  ];

  useEffect(() => {
    // Aquí usaríamos fetchServices para obtener los datos reales desde el backend
    // Como solo tenemos datos de ejemplo, establecemos directamente los datos ficticios
    setServices(servicesData);
  }, []);

  const handleShowModal = (service) => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        id: '',
        name: '',
        description: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para enviar los datos del formulario al backend para crear o actualizar el servicio
      if (formData.id) {
        // Lógica para actualizar servicio
      } else {
        // Lógica para crear servicio
      }
      handleCloseModal();
      // Como estamos usando datos ficticios, simplemente actualizamos la lista de servicios
      setServices(servicesData);
    } catch (error) {
      console.error('Error al guardar el servicio:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Lógica para eliminar el servicio utilizando el backend
      // Actualiza la lista de servicios después de eliminar
      // Como estamos usando datos ficticios, simplemente actualizamos la lista de servicios
      setServices(servicesData.filter((service) => service.id !== id));
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
    }
  };

  return (
    <Container className='mt-3'>
      <h1>Gestión de Servicios</h1>
      <Button style={{ fontWeight: 'bold', margin: '15px' }} variant="success" size="lg" onClick={() => handleShowModal()}>Agregar Servicio</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} style={{ marginBottom: '10px' }}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td className="d-flex justify-content-center flex-column">
                <Button style={{ fontWeight: 'bold', margin: '5px' }} variant="outline-warning"onClick={() => handleShowModal(service)}>Modificar</Button>
                <Button style={{ fontWeight: 'bold', margin: '5px' }} variant="outline-danger" onClick={() => handleDelete(service.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre del Servicio</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descripción del Servicio</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Agrega aquí más campos para el formulario de servicio */}
            <div className="d-grid gap-2">
            <Button variant="success" type="submit" size='lg' style={{ fontWeight: 'bold', marginTop: '15px' }}>
              Guardar
            </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ServicesCrud;
