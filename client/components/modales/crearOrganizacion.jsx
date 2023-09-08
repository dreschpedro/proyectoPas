import React from 'react'

function crearOrganizacion() {

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
    <Modal show={showModal} onHide={handleCloseModal} >
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? 'Editar Organización' : 'Agregar Organización'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} >

          <Row>
            <Col >

              <Form.Group controlId="formName">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Nombre de la Organización*</Form.Label> */}
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    required
                    onChange={handleChange}
                    placeholder="Nombre de la Organización" />
                </Form.Group>
              </Form.Group>

              <Form.Group controlId="formDomicilio">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Dirección*</Form.Label> */}
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    required
                    onChange={handleChange}
                    placeholder="Dirección" />
                </Form.Group>
              </Form.Group>


              <Form.Group controlId="formNumber">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Número de Teléfono*</Form.Label> */}
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="number"
                    name="telefono"
                    value={formData.telefono}
                    required
                    onChange={handleChange}
                    placeholder="Número de Teléfono" />
                </Form.Group>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Email*</Form.Label> */}
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="email"
                    name="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                    placeholder="Email" />
                </Form.Group>
              </Form.Group>

            </Col>


            {/* imagen de la Organización */}
            <Col md={{ order: 'last' }} xs={{ order: 'first' }}>

              <Form.Group controlId="formFile">
                <Form.Label>Subir imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="imagen"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="text"
                    as="textarea"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="" />
                </Form.Group>
              </Form.Group>

            </Col>
          </Row>

          <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
            <button type="button" className='bouttoncancel' onClick={handleCloseModal}>
              Cancelar
            </button>


            <button className='buttonRegistrar' type="submit" style={{ width: '60%' }}>
              Registrar Organización
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default crearOrganizacion
