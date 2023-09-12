"use client"
import React, { useState, useEffect } from 'react';
import { Container, Table, InputGroup, Button, Modal, Form } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useParams } from 'next/navigation'; // Agrega esta importación para usar el enrutador

const crudTable = ({ data }) => {
  const router = useRouter(); // Inicializa el enrutador
  const [items, setitems] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [updateditems, setUpdateditems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selecteditemId, setSelecteditemId] = useState(null);
  const [selecteditem, setSelecteditem] = useState({
    nombre: '',
    descripcion: '',
  }); // Inicializa selecteditem con valores vacíos
  const [itemInfo, setitemInfo] = useState({
    id_organizacion: '',
  });
  //   const [accountDeleted, setAccountDeleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // Agrega el estado para mostrar el mensaje de confirmación

  const handleChange = (e) => {
    setSelecteditem({
      ...selecteditem,
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
        setUpdateditems(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchOrganizaciones();
    fetchServicios();
  }, []);

  //   const handleCloseModal = () => {
  //     setSelecteditemId(null);
  //     setShowModal(false);
  //   };

  const handleShowDeleteModal = (itemId) => {
    setSelecteditemId(itemId);
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
    setitemInfo((previtemInfo) => ({
      ...previtemInfo,
      id_organizacion: organizacionId,
    }));
  };

  const handleShowModal = (item) => {
    setSelecteditemId(item.id_servicio);
    setSelecteditem(item); // Actualiza selecteditem con los datos del servicio seleccionado
    setitemInfo({ id_organizacion: item.id_organizacion }); // Inicializa itemInfo con la organización del servicio seleccionado
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
      await instance.put(`/servicios/estado/${selecteditemId}`);
      console.log('Servicio eliminado exitosamente');

      // Agrega el servicio eliminado a la lista de servicios actualizados
      const updateditem = items.find(item => item.id_servicio === selecteditemId);
      if (updateditem) {
        setUpdateditems([updateditem, ...updateditems]);
      }

      setAccountDeleted(true);
      handleCloseDeleteModal();
      showAndCloseConfirmation();

      setTimeout(() => {
        router.push('/admin/servicios/crudServicios');
      }, 1500); // Redirige después de 1.5 segundos
    } catch (error) {
      console.error('Error al eliminar el servicio:', error.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nombre: selecteditem.nombre,
        descripcion: selecteditem.descripcion,
        id_organizacion: itemInfo.id_organizacion,
      };

      if (selecteditemId) {
        // Editar un servicio existente
        await instance.put(`/servicios/${selecteditemId}`, dataToSend);
        console.log('Servicio editado exitosamente');
      } else {
        // Agregar un nuevo servicio
        const response = await instance.post('/servicios/registrar', dataToSend);
        console.log(response.data.message);
      }

      console.log('Guardando cambios');
      fetchServicios();
      showAndCloseConfirmation();
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  return (
    <Container className='mt-3'>

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
          {data.map((item) => (
            <tr key={item.id_servicio} style={{ marginBottom: '10px' }}>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selecteditemId ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
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
                value={selecteditem.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formOrganizacion">
              <InputGroup>
                <Form.Control
                  className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                  placeholder='Organización'
                  as="select"
                  value={itemInfo.id_organizacion}
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
                value={selecteditem.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button type="button" className='bouttoncancel' onClick={handleCloseModal}>Cerrar</button>
              {selecteditemId ? (
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

export default crudTable;