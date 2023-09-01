"use client"

import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams, useRouter } from 'next/navigation'; // Update import

function PerfilPersonal() {
  const { id } = useParams();
  const router = useRouter();

  const [modificationError, setModificationError] = useState(null);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [PersonalData, setPersonalData] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    apellido: '',
    nombre: '',
    organizacion: '',
    email: '',
    rol: '',
    cuilt: '',
    telefono: '',
    domicilio: '',
    profesion: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const obtenerPersonalPorId = async () => {
      try {
        const response = await instance.get(`/personal/${id}`);

        const resData = response.data;
        console.log('Datos del Personal obtenidos:', resData);

        setPersonalData(resData);
        setFormData({
          // datos del usuario
          username: resData.personal.usuario?.username || '',
          email: resData.personal.usuario?.email || '',
          rol: resData.personal.usuario?.rol || '',

          // datos de la organizacion
          organizacion: resData.organizacion?.nombre || '',

          // datos del personal
          apellido: resData.personal.apellido || '',
          nombre: resData.personal.nombre || '',
          cuilt: resData.personal.cuilt || '',
          telefono: resData.personal.telefono || '',
          domicilio: resData.personal.domicilio || '',
          profesion: resData.personal.profesion || '',
        });
      } catch (error) {
        console.error('Error al obtener los datos del Personal:', error.message);
      }
    };

    if (id) {
      obtenerPersonalPorId();
    }
  }, [id, editing]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setFormData({
      // datos del usuario
      username: PersonalData.personal?.usuario?.username || '',
      email: PersonalData.personal?.usuario?.email || '',
      rol: PersonalData.personal?.usuario?.rol || '',

      // datos de la organizacion
      organizacion: PersonalData.organizacion?.nombre || '',

      // datos del personal
      apellido: PersonalData.personal?.apellido || '',
      nombre: PersonalData.personal?.nombre || '',
      cuilt: PersonalData.personal?.cuilt || '',
      telefono: PersonalData.personal?.telefono || '',
      domicilio: PersonalData.personal?.domicilio || '',
      profesion: PersonalData.personal?.profesion || '',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        const response = await instance.put(`/personal/${id}`, formData);
        console.log('Datos del personal actualizados exitosamente:', response.data);

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

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };


  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await instance.put(`/personal/estado/${id}`);
      console.log('Cuenta eliminada exitosamente');
      setAccountDeleted(true);
      handleCloseDeleteModal(); // Close the delete modal

      // Redirect to "/usuarios" after a short delay
      setTimeout(() => {
        router.push('/usuarios');
      }, 1500); // 1.5 seconds delay before redirection
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error.message);
    }
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

  return (
    <Form onSubmit={handleSubmit}>

      <h1 className='titulo mb-5'>Perfil</h1>

      <Row className='bordesito'>
        <Col md>
          <Form.Group controlId="formtext">
            <Form.Group className="mb-3" controlId="username">
              {/* <Form.Label>Nombre de Usuario*</Form.Label> */}
              <Form.Control

                name="username"
                type="text"
                value={formData.username}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Nombre de Usuario'
                onChange={handleChange} // Agrega este atributo
              />

            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formApe">
            <Form.Group className="mb-3" controlId="apellido">
              {/* <Form.Label>Apellido*</Form.Label> */}
              <Form.Control

                name="apellido"
                type="text"
                value={formData.apellido}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Apellido'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Group className="mb-3" controlId="exampleForm.Control Input1">
              {/* <Form.Label>Nombres*</Form.Label> */}
              <Form.Control

                name="nombre"
                type="text"
                value={formData.nombre}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Nombres'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formOrganizacion">
            <Form.Group className="mb-3" controlId="exampleForm.Control Input1">
              {/* <Form.Label>Organización*</Form.Label> */}
              <Form.Control

                name="organizacion"
                type="text"
                value={formData.organizacion}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Organización'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Group className="mb-3" controlId="exampleForm.Control Input1">
              {/* <Form.Label>Email*</Form.Label> */}
              <Form.Control

                name="email"
                type="email"
                value={formData.email}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Email'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group controlId="formEmail">
            <Form.Group className="mb-3" controlId="exampleForm.Control Input1">
              {/* <Form.Label>Rol*</Form.Label> */}
              <Form.Control

                name="rol"
                type="text"
                value={formData.rol}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Rol'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formCuilt">
            <Form.Group className="mb-3" controlId="exampleForm.Control Input1">
              {/* <Form.Label>CUIL o CUIT*</Form.Label> */}
              <Form.Control

                name="cuilt"
                type="text"
                value={formData.cuilt}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='CUIL o CUIT'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formNumber">
            <Form.Group className="mb-3" controlId="exampleForm.Control Input1">
              {/* <Form.Label>Teléfono*</Form.Label> */}
              <Form.Control

                name="telefono"
                type="text"
                value={formData.telefono}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Teléfono'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formdomicilio">
            <Form.Group className="mb-3" controlId="exampleForm.Control Input1">
              {/* <Form.Label>domicilio*</Form.Label> */}
              <Form.Control

                name="domicilio"
                type="text"
                value={formData.domicilio}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Domicilio'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formProfesion">
            <Form.Group className="mb-3" controlId="exampleForm.Control Input1">
              {/* <Form.Label>Profesión*</Form.Label> */}
              <Form.Control

                name="profesion"
                type="text"
                value={formData.profesion}
                readOnly={!editing}

                required
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Profesión'
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
        </Col>

        {/* MODIFICAR/GUARDAR CAMBIOS || CANCELAR */}
        <div className='d-flex flex-wrap justify-content-center mx-auto' >
          <div className='mx-3 mt-3'>
            {!editing ? (
              <Button
                variant="warning"
                onClick={handleEditClick}
                style={{ width: '200px', fontWeight: 'bold' }}
              >
                Modificar cuenta
              </Button>
            ) : (
              <>

                <div >
                  <Button
                    variant="success"
                    type="submit"
                    style={{ width: '200px', fontWeight: 'bold', marginRight: '10px' }}
                  >
                    Guardar Cambios
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleCancelClick}
                    style={{ width: '200px', fontWeight: 'bold' }}
                  >
                    Cancelar
                  </Button>
                </div>
                {modificationError && (
                  <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                    {modificationError}
                  </p>
                )}
              </>
            )}
          </div>

          <div className='mx-3 mt-3'>
            <Button
              variant="danger"
              onClick={handleShowDeleteModal}
              style={{ width: '200px', fontWeight: 'bold' }}
            >
              Eliminar cuenta
            </Button>
          </div>
        </div>
      </Row>

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

    </Form>
  );
}

export default PerfilPersonal;
