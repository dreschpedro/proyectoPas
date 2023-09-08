"use client"
import React, { useState, useEffect } from 'react';
import { Container, Table, InputGroup, Button, Modal, Form } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { GET } from '../../../api/crudProductos/route.js';





// const fetchData = async () => {
//   const data = await GET();
//   console.log(data);
// };

// fetchData();

const ProductsCrud = () => {
  const [listaProductos, setListaProductos] = useState([])
  const [services, setServices] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]); // Agregar estado para las organizaciones
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [serviceInfo, setServiceInfo] = useState({
    id_organizacion: '',
    Organizacion: '', // Combobox para la organización que realiza el servicio
  });

 

  // const products = GET()

  // const productData = products.map(product => {
  //   return {
  //     name: product.name,
  //     description: product.description
  //   }
  // })

  // setProductData(productData)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productos = await GET();
        console.log(`productos: `, productos);

        if (Array.isArray(productos)) {
          setListaProductos(productos);
        } else {
          console.error('La respuesta de GET no es un array:', productos);
        }
      } catch (error) {
        console.error('Error al obtener la lista de Organizaciones:', error);
      }
    };

    fetchData();
  }, []);




  useEffect(() => {
    const fetchOrganizaciones = async () => {
      try {
        const response = await instance.get('/organizaciones');
        setOrganizaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las organizaciones:', error);
      }
    };

    const fetchServicios = async () => {
      try {
        const response = await instance.get('/servicios');
        console.log(`Datos del back: `);
        console.log(response.data);
        setServices(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchOrganizaciones();
    fetchServicios();
  }, []);

  const handleChange = (e) => {
    setSelectedService({
      ...selectedService,
      [e.target.name]: e.target.value,
    });
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowDeleteModal = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const setOrganizacionValue = (organizacionId) => {
    setServiceInfo((prevServiceInfo) => ({
      ...prevServiceInfo,
      id_organizacion: organizacionId,
    }));
  };


  const handleShowModal = (service) => {
    setSelectedService(service);

    if (service && service.id_servicio) {
      setOrganizacionValue(service.id_organizacion);
    } else {
      setOrganizacionValue(''); // Restablecer el valor de id_organizacion
    }

    setShowModal(true);
    console.log("Datos del servicio seleccionado:", service);
  };

  const handleCloseConfirmation = () => {
    console.log('Cerrando modal de confirmación');
    setShowConfirmation(false);
  };

  const showAndCloseConfirmation = () => {
    console.log('Mostrando modal de confirmación');
    setShowConfirmation(true);
    setTimeout(() => {
      console.log('Cerrando modal de confirmación');
      setShowConfirmation(false);
    }, 2000); // Cerrar el modal después de 2 segundos (2000 ms)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nombre: selectedService.nombre, 
        descripcion: selectedService.descripcion,
        id_organizacion: serviceInfo.id_organizacion,
      };

      if (selectedService.id_servicio) {
        // Editar un servicio existente
        await instance.put(`/servicios/${selectedService.id_servicio}`, dataToSend);
        console.log('Servicio editado exitosamente');
      } else {
        // Agregar un nuevo servicio
        const response = await instance.post('/servicios/registrar', dataToSend);
        console.log(response.data.message);
      }

      console.log('Guardando cambios');
      fetchServices();
      showAndCloseConfirmation(); // Mostrar mensaje de confirmación y cerrar después de 2 segundos
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleDeleteService = async () => {
    try {
      await instance.put(`/servicios/estado/${selectedService.id_servicio}`);
      console.log('Servicio eliminado exitosamente');
      console.log('Eliminando servicio');
      fetchServices();
      handleCloseDeleteModal();
      showAndCloseConfirmation(); // Mostrar mensaje de confirmación y cerrar después de 2 segundos
    } catch (error) {
      console.error('Error al eliminar el servicio:', error.message);
    }
  };


  const [data, setdata] = useState([]);

  return (
    <Container className='mt-3'>
     <div className='d-flex justify-content-between flex-wrap mb-3'>
      <h1 className='titulo'>Gestión de Productos</h1>
      <button
       className='buttonRegistrar responsive-buttons'
        size="lg"
        onClick={() => handleShowModal()}
      >
        Agregar Productos
      </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#101488', color: '#ffffff', borderTopLeftRadius: '5px' }}>ID</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Nombre</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Descripción</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Organización</th>
            <th style={{ borderTopRightRadius: '5px', backgroundColor: '#101488', color: '#ffffff' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id_servicio} style={{ marginBottom: '10px' }}>
              <td>{service.id_servicio}</td>
              <td>{service.nombre}</td>
              <td>{service.descripcion}</td>
              <td>{service.organizacion?.nombre}</td>
              <td className="d-flex justify-content-center ">
                <Button
                  style={{ width: '40px', fontWeight: 'bold', margin: '5px' }}
                  variant="outline-warning"
                  onClick={() => handleShowModal(service)} // Pasamos el servicio seleccionado
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>

                <Button
                  variant="outline-danger"
                  onClick={() => handleShowDeleteModal(service)}
                  style={{ width: '40px', fontWeight: 'bold', margin: '5px' }}
                >
                  <FontAwesomeIcon icon={faTrashAlt}/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              {/* <Form.Label>Nombre del Servicio*</Form.Label> */}
              <Form.Control
                className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Nombre del servicio'
                type="text"
                name="nombre"
                required
                value={selectedService?.nombre || ''}
                onChange={handleChange}
              />
            </Form.Group>


            <Form.Group controlId="formOrganizacion">
              {/* <Form.Label>Organización*</Form.Label> */}
              <InputGroup >
                <Form.Control
                  className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                  placeholder='Organización'
                  as="select"
                  value={serviceInfo.id_organizacion} // Cambia a serviceInfo.id_organizacion
                  onChange={(e) => setOrganizacionValue(e.target.value)} // Usa setOrganizacionValue directamente
                  required
                >
                  <option value="">Seleccionar Organización</option>
                  {organizaciones.map((organizacion) => (
                    <option key={organizacion.id_organizacion} value={organizacion.id_organizacion}>
                      {organizacion.nombre}
                    </option>
                  ))}
                </Form.Control>

              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción del Servicio</Form.Label>
              <Form.Control
                // placeholder='Descripción del Servicio'
                className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                as="textarea"
                name="descripcion"
                value={selectedService?.descripcion || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button type="button" className='bouttoncancel' onClick={handleCloseModal}>Cerrar</button>
              {selectedService ? (
                <button className='buttonRegistrar' type="submit">Guardar Cambios</button>
              ) : (
                <button className='buttonRegistrar' type="submit">Agregar Servicio</button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea eliminar el Servicio?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteService}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default ProductsCrud;
