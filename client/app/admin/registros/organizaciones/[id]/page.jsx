"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import { useParams, useRouter } from 'next/navigation';


const PerfilOrganizacion = () => {
  const { id } = useParams();

  const [OrganizacionData, setOrganizacionData] = useState({});
  const [editing, setEditing] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    descripcion: '',
  });

  const router = useRouter();

  useEffect(() => {
    // Realiza la solicitud GET para obtener los datos de la organizacion por su ID
    const obtenerOrganizacionPorId = async () => {
      try {
        const response = await instance.get(`/organizaciones/${id}`);
        setOrganizacionData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de la organizacion:', error.message);
      }
    };

    if (id) {
      obtenerOrganizacionPorId();
    }
  }, [id]); // Escucha los cambios en el id para volver a obtener los datos cuando cambia


  useEffect(() => {
    setFormData({
      nombre: OrganizacionData.nombre,
      direccion: OrganizacionData.direccion,
      telefono: OrganizacionData.telefono,
      email: OrganizacionData.email,
      descripcion: OrganizacionData.descripcion,
    });
  }, [OrganizacionData]);


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

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCancelEditing = () => {
    setEditing(false);
    setFormData({
      nombre: OrganizacionData.nombre || '',
      direccion: OrganizacionData.direccion || '',
      telefono: OrganizacionData.telefono || '',
      email: OrganizacionData.email || '',
      descripcion: OrganizacionData.descripcion || '',
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        const response = await instance.put(`/organizaciones/${id}`, formData);
        console.log('Datos de la Organizacion actualizados exitosamente:', response.data);

        if (response.data.activo === false) {
          // Si el registro no está activo, muestra un mensaje al usuario
          setModificationError('No se pudo modificar el registro ya que no está activo.');
        } else {
          setEditing(false);
          setModificationError(null);
        }

      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await instance.put(`/organizaciones/estado/${id}`);
      console.log('Cuenta eliminada exitosamente');
      setAccountDeleted(true);
      handleCloseDeleteModal(); // Close the delete modal

      // Redirect to "/organizaciones" after a short delay
      setTimeout(() => {
        router.push('/admin/organizaciones');
      }, 1500); // 1.5 seconds delay before redirection
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error.message);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    if (accountDeleted) {
      // Redirect to "/organizaciones" after a short delay
      setTimeout(() => {
        router.push('/admin/organizaciones');
      }, 2000); // 1.5 seconds delay before redirection
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <>
      <h1 className='titulo mb-5'>{editing ? 'Editar Perfil de la organizacion' : 'Perfil de la organizacion'}</h1>
      <Form className='bordesito' onSubmit={handleSubmit}>

        <Form.Group controlId="formLogo">
          <Form.Label>Logo de la organizacion</Form.Label>
          <br />
          <img
            src={`${serverURL}${OrganizacionData.imagen}`} // Cambia Organizacion.imagen por OrganizacionData.imagen
            alt={OrganizacionData.nombre} // Cambia Organizacion.nombre por OrganizacionData.nombre
            style={{ maxWidth: '60px' }}
          />

          {editing && <Form.Control type="file" name="logo" onChange={handleImageUpload} />}
        </Form.Group>

        <Form.Group controlId="formNombre">
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              name='nombre'
              aria-label="Nombre"
              aria-describedby="inputGroup-sizing-default"
              value={formData.nombre}
              placeholder="Nombre de la organizacion"
              required
              readOnly={!editing}
              onChange={handleChange}
              className="mb-3 border border-secondary rounded rounded-1.1 shadow"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formDireccion">
          <InputGroup className="mb-3 mt-3">

            <Form.Control
              name='direccion'
              aria-label="Dirección"
              aria-describedby="inputGroup-sizing-default"
              value={formData.direccion}
              placeholder="Dirección de la organizacion"
              required
              readOnly={!editing}
              onChange={handleChange}
              className="mb-3 border border-secondary rounded rounded-1.1 shadow"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formContacto">
          <InputGroup className="mb-3">
            <Form.Control
              type="tel"
              name='telefono'
              aria-label="Número de contacto"
              aria-describedby="inputGroup-sizing-default"
              value={formData.telefono}
              placeholder="Número de contacto"
              required
              readOnly={!editing}
              onChange={handleChange}
              className="mb-3 border border-secondary rounded rounded-1.1 shadow"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <InputGroup className="mb-3">
            <Form.Control
              type="email"
              name="email"
              aria-label="Email corporativo"
              aria-describedby="inputGroup-sizing-default"
              value={formData.email}
              placeholder="Ingresa el email corporativo"
              required
              readOnly={!editing}
              onChange={handleChange}
              className="mb-3 border border-secondary rounded rounded-1.1 shadow"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formDescripcion">
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              type='text'
              name='descripcion'
              rows={5}
              aria-label="Descripción general de la organizacion"
              aria-describedby="inputGroup-sizing-default"
              value={formData.descripcion}
              placeholder="Ingresa una descripción general de la organizacion"
              required
              readOnly={!editing}
              onChange={handleChange}
              className="mb-3 border border-secondary rounded rounded-1.1 shadow"
            />
          </InputGroup>
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {editing ? (
            <>
              <Button
                variant="success"
                type="submit"
                style={{ width: '200px', fontWeight: 'bold', margin: '5px' }}
              >
                Guardar Cambios
              </Button>
              <Button
                type='button'
                variant="danger"
                onClick={handleCancelEditing}
                style={{ width: '200px', fontWeight: 'bold', margin: '5px' }}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              variant="warning"
              onClick={handleEditClick}
              style={{ width: '200px', fontWeight: 'bold', margin: '5px' }}
            >
              Modificar
            </Button>
          )}
          {!editing && (
            <Button
              variant="danger"
              onClick={handleShowDeleteModal}
              type="submit"
              style={{ width: '200px', fontWeight: 'bold', margin: '5px' }}
            >
              Eliminar
            </Button>
          )}
        </div>

      </Form>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cambio de Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar su cuenta?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Account Deleted Confirmation */}
      <Modal show={accountDeleted} onHide={handleConfirmationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cuenta Eliminada Exitosamente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          La cuenta ha sido eliminada exitosamente.
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PerfilOrganizacion;
