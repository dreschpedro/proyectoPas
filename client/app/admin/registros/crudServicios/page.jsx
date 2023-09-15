"use client"
import React, { useState, useEffect } from 'react';
import { Container, Table, InputGroup, Button, Modal, Form } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useParams } from 'next/navigation'; // Agrega esta importación para usar el enrutador
import CrudTable from '@/components/crudTable';
import axios from 'axios';


const ServicesCrud = () => {
  const [datos, setDatos] = useState([]);
  const router = useRouter(); // Inicializa el enrutador
  const [services, setServices] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [updatedServices, setUpdatedServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedService, setSelectedService] = useState({
    nombre: '',
    descripcion: '',
  }); // Inicializa selectedService con valores vacíos
  const [serviceInfo, setServiceInfo] = useState({
    id_organizacion: '',
  });
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // Agrega el estado para mostrar el mensaje de confirmación

  const handleChange = (e) => {
    setSelectedService({
      ...selectedService,
      [e.target.name]: e.target.value,
    });
  };

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
        setUpdatedServices(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchOrganizaciones();
    fetchServicios();
   
  }, []);

  const handleCloseModal = () => {
    setSelectedServiceId(null);
    setShowModal(false);
  };

  const handleShowDeleteModal = (serviceId) => {
    setSelectedServiceId(serviceId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    if (accountDeleted) {
      // Redirect to "/organizaciones" after a short delay
      setTimeout(() => {
        router.push('/admin/servicios/crudServicios');
      }, 2000); // 1.5 seconds delay before redirection
    }
  };

  const setOrganizacionValue = (organizacionId) => {
    setServiceInfo((prevServiceInfo) => ({
      ...prevServiceInfo,
      id_organizacion: organizacionId,
    }));
  };

  const handleShowModal = (service) => {
    setSelectedServiceId(service.id_servicio);
    setSelectedService(service); // Actualiza selectedService con los datos del servicio seleccionado
    setServiceInfo({ id_organizacion: service.id_organizacion }); // Inicializa serviceInfo con la organización del servicio seleccionado
    setShowModal(true);
  };

  const showAndCloseConfirmation = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  };

  const handleDeleteAccount = async () => {
    try {
      await instance.put(`/servicios/estado/${selectedServiceId}`);
      console.log('Servicio eliminado exitosamente');

      // Agrega el servicio eliminado a la lista de servicios actualizados
      const updatedService = services.find(service => service.id_servicio === selectedServiceId);
      if (updatedService) {
        setUpdatedServices([updatedService, ...updatedServices]);
      }

      setAccountDeleted(true);
      handleCloseDeleteModal();
      showAndCloseConfirmation();

      // setTimeout(() => {
      //   router.push('/admin/servicios/crudServicios');
      // }, 1500); // Redirige después de 1.5 segundos []
    } catch (error) {
      console.error('Error al eliminar el servicio:', error.message);
    }
    updateData();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nombre: selectedService.nombre,
        descripcion: selectedService.descripcion,
        id_organizacion: serviceInfo.id_organizacion,
      };

      if (selectedServiceId) {
        // Editar un servicio existente
        await axios.put(`${serverURL}/servicios/${selectedServiceId}`, dataToSend);
        console.log('Servicio editado exitosamente');
      } else {
        // Agregar un nuevo servicio
        const response = await axios.post(`${serverURL}/servicios/registrar`, dataToSend);
        console.log(response.data.message);
      }
      handleCloseModal()

      console.log('Guardando cambios');
      fetchServicios();
      showAndCloseConfirmation();
      
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
    updateData();
  };



 //ACA IRIA LA ORGANIZACION SI TUVIERAMOS LOGIN ECHO Y LOS CONTROLADORE ACCTUALIZADOS....
  const organizacion =''

  //GET DE LA TABLA
  useState(() => {

    axios.get(`${serverURL}/servicios/activo${organizacion}`)
      .then(response => {
        // console.log('aca esta el response: ', response)
        setDatos(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      })
  }, []);
  //FIN DEL GET DE LA TABLA



  //ACTUALIZAR DATOS DE LA TABLA(se tubo que hacer aparte por la logica de JS)

  const updateData = () => {
    axios.get(`${serverURL}/servicios/activo${organizacion}`)
      .then(response => {
        setDatos(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };
  

  //ACTUALIZAR DATOS DE LA TABLA FIN.



  return (
    <Container className='mt-3'>
      <div className='d-flex justify-content-between flex-wrap mb-3'>
        <h1 className='titulo'>Gestión de Servicios</h1>
        <button
          className='buttonRegistrar responsive-buttons'
          size="lg"
          onClick={() => handleShowModal({ id_servicio: null, id_organizacion: '', nombre: '', descripcion: '' })}
        >
          Agregar Servicio
        </button>
        </div>


<Table striped bordered hover>
  <thead>
    <tr>

      <th style={{ backgroundColor: '#101488', color: '#ffffff', borderTopLeftRadius: '5px' }}>Nombre</th>
      <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Descripción</th>
      <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Organización</th>
      <th style={{ borderTopRightRadius: '5px', backgroundColor: '#101488', color: '#ffffff' }}>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {datos.map((item) => (
      <tr key={item.id_producto} style={{ marginBottom: '10px' }}>
        <td>{item.nombre}</td>
        <td>{item.descripcion}</td>
        <td>{item.organizacion}</td>
        <td className="d-flex justify-content-center ">
          <Button
            style={{ width: '40px', fontWeight: 'bold', margin: '5px' }}
            variant="outline-warning"
            onClick={() => handleShowModal(item)}
          >

            
            <FontAwesomeIcon icon={faPencilAlt} />
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => handleShowDeleteModal(item.id_servicio)}
            style={{ width: '40px', fontWeight: 'bold', margin: '5px' }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

<Modal show={showModal} 
onHide={handleCloseModal}
>
  <Modal.Header closeButton>
    <Modal.Title>
      {selectedServiceId ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Control
          className="mb-3 border border-secondary rounded rounded-1.1 shadow"
          placeholder='Nombre del servicio'
          type="text"
          name="nombre"
          required
          value={selectedService.nombre}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formOrganizacion">
        <InputGroup>
          <Form.Control
            className="mb-3 border border-secondary rounded rounded-1.1 shadow"
            placeholder='Organización'
            as="select"
            value={serviceInfo.id_organizacion}
            onChange={(e) => setOrganizacionValue(e.target.value)}
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
          className="mb-3 border border-secondary rounded rounded-1.1 shadow"
          as="textarea"
          name="descripcion"
          value={selectedService.descripcion}
          onChange={handleChange}
        />
      </Form.Group>
      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
        <button type="button" className='bouttoncancel'
         onClick={handleCloseModal}
         >Cerrar</button>
        {selectedServiceId ? (
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
    <Button
      variant="secondary"
      onClick={handleCloseDeleteModal}>
      Cancelar
    </Button>
    <Button
      variant="danger"
      onClick={handleDeleteAccount}>
      Eliminar
    </Button>
  </Modal.Footer>
</Modal>

<Modal show={showConfirmation} 
// onHide={handleConfirmationClose}
>
  <Modal.Header closeButton>
    <Modal.Title>Operación Exitosa</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Servicio Eliminado Exitosamente!
  </Modal.Body>
</Modal>




      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedServiceId ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Control
                className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Nombre del servicio'
                type="text"
                name="nombre"
                required
                value={selectedService.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formOrganizacion">
              <InputGroup>
                <Form.Control
                  className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                  placeholder='Organización'
                  as="select"
                  value={serviceInfo.id_organizacion}
                  onChange={(e) => setOrganizacionValue(e.target.value)}
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
                className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                as="textarea"
                name="descripcion"
                value={selectedService.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button type="button" className='bouttoncancel' onClick={handleCloseModal}>Cerrar</button>
              {selectedServiceId ? (
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
          <Button
            variant="secondary"
            onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmation} onHide={handleConfirmationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Operación Exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Servicio Eliminado Exitosamente!
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ServicesCrud;