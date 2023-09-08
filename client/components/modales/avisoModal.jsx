import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

function avisoModal() {
  const handleShowModal = (Organ) => {
    if (Organ) {
      setFormData(Organ);
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
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('direccion', formData.direccion);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('descripcion', formData.descripcion);

      if (formData.imagen instanceof File) {
        formDataToSend.append('imagen', formData.imagen);
      }

      console.log('Datos enviados al backend:', formDataToSend);

      const response = await instance.post('/organizaciones/registrar', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Verificar si la respuesta es exitosa
      if (response.status === 200) {
        // Mostrar el modal de éxito
        setShowSuccessAlert(true);

        // Establecer un temporizador para ocultar el modal después de 3 segundos
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
      } else {
        // Mostrar el modal de error con el mensaje del servidor
        const responseData = await response.json();
        alert(responseData.error); // Puedes personalizar el mensaje de error como desees
        setShowErrorAlert(true);

        // Establecer un temporizador para ocultar el modal de error después de 3 segundos
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error al guardar la organización:', error);
      // Mostrar el modal de error genérico en caso de error
      setShowErrorAlert(true);

      // Establecer un temporizador para ocultar el modal de error después de 3 segundos
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
    }
  };

  console.log('listaOrganizaciones: \n', listaOrganizaciones);

  const handleUserClick = (id) => {
    // Redireccionar a la página de detalle del usuario con el ID correspondiente
    window.location.href = `/admin/organizaciones/${id}`;
  };




  return (
    <Modal show={showErrorAlert} onHide={() => setShowErrorAlert(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Ya existe una Organización con este Email !
      </Modal.Body>
    </Modal>
  )
}

export default avisoModal
