"use client"
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import instance from '@/app/axiosConfig.js';

const ServicesCrud = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [serviceDeleted, setServiceDeleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    id_organizacion: 1, // ID de organización de ejemplo
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await instance.get('/servicios');
      setServices(response.data);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  const handleShowModal = () => {
    setFormData({
      name: '',
      description: '',
      id_organizacion: 1, // Reiniciar el ID de organización en el modal
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowDeleteModal = (service) => {
    setFormData(service); // Configurar formData con el servicio seleccionado
    setShowDeleteModal(true);
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
      const dataToSend = {
        id_organizacion: formData.id_organizacion, // Enviar el id_organizacion actual
        nombre: formData.nombre,
        descripcion: formData.descripcion,
      };

      const response = await instance.post('/servicios/registrar', dataToSend);
      console.log(response.data.message);
      fetchServices();
      handleCloseModal();
    } catch (error) {
      console.error('Error al registrar el servicio:', error);
    }
  };

  const handleServiceClick = (id) => {
    //Redireccionar a la página de detalle del usuario con el ID correspondiente
    window.location.href = `/servicios/${id}`;
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    if (accountDeleted) {
      // Redirect to "/usuarios" after a short delay
      setTimeout(() => {
        router.push('/usuarios');
      }, 2000); // 1.5 seconds delay before redirection
    }
  };

  const handleDeleteService = async () => {
    try {
      await instance.put(`/servicios/estado/${id}`);
      console.log('Servicio eliminado exitosamente');
      setServiceDeleted(true);
      handleCloseDeleteModal(); // Close the delete modal

    } catch (error) {
      console.error('Error al eliminar la cuenta:', error.message);
    }
  };


  return (
    <Container className='mt-3'>
      <h1>Gestión de Servicios</h1>
      <Button
        style={{ fontWeight: 'bold', margin: '15px' }}
        variant="success"
        size="lg"
        onClick={() => handleShowModal()}
      >
        Agregar Servicio
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th
              style={{ backgroundColor: '#101488', color: '#ffffff', borderTopLeftRadius: '5px' }}
            >ID</th>
            <th
              style={{ backgroundColor: '#101488', color: '#ffffff' }}
            >Nombre</th>
            <th
              style={{ backgroundColor: '#101488', color: '#ffffff' }}
            >Descripción</th>
            <th
              style={{ backgroundColor: '#101488', color: '#ffffff' }}
            >Organización</th>
            <th
              style={{ borderTopRightRadius: '5px', backgroundColor: '#101488', color: '#ffffff' }}
            >Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr
              key={service.id_servicio}
              style={{
                marginBottom: '10px',
                cursor: 'pointer'
              }}
            >
              <td onClick={() => handleServiceClick(service.id_servicio)}
              >{service.id_servicio}</td>
              <td onClick={() => handleServiceClick(service.id_servicio)}
              >{service.nombre}</td>
              <td onClick={() => handleServiceClick(service.id_servicio)}
              >{service.descripcion}</td>
              <td onClick={() => handleServiceClick(service.id_servicio)}
              >{service.organizacion?.nombre}</td>
              <td className="d-flex justify-content-center flex-column">
                <Button
                  style={{ width: '200px', fontWeight: 'bold', margin: '5px' }}
                  variant="outline-warning"
                  onClick={() => handleShowModal(service)}
                >
                  Modificar
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleShowDeleteModal(service)}
                  style={{ width: '200px', fontWeight: 'bold', margin: '5px' }}
                >
                  Eliminar Servicio
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre del Servicio</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción del Servicio</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Agrega aquí más campos para el formulario de servicio */}
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button
                type="button"
                className='bouttoncancel'
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
              <button className='buttonRegistrar' type="submit">
                Registrar Servicio
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar el Servicio?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteService}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={serviceDeleted} onHide={handleConfirmationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cuenta Eliminada Exitosamente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          La cuenta ha sido eliminada exitosamente.
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ServicesCrud;
