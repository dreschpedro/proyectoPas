  //front
  "use client";
  import React, { useState, useEffect } from 'react';
  import { Container, Modal, Form, Table, Button, InputGroup } from 'react-bootstrap';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Link from 'next/link';
  import instance, { serverURL } from '../axiosConfig.js'; // Corregimos el nombre de la importación

  const ListaOrganizaciones = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [listaOrganizaciones, setListaOrganizaciones] = useState([]);
    const [formData, setFormData] = useState({
      nombre: '',
      email: '',
      imagen: '',
      telefono: '',
      direccion: '',
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await instance.get('/organizaciones');
          setListaOrganizaciones(response.data);
        } catch (error) {
          console.error('Error al obtener la lista de Organizaciones:', error);
        }
      };

      fetchData();
    }, []);

    // Filtrar los datos cuando el término de búsqueda cambie
    useEffect(() => {
      if (searchTerm) {
        const filteredData = listaOrganizaciones.filter((organizacion) => {
          return (
            organizacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            organizacion.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            organizacion.telefono.includes(searchTerm) ||
            organizacion.email.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setFilteredData(filteredData);
      } else {
        // Si no hay término de búsqueda, mostrar todos los datos
        setFilteredData(listaOrganizaciones);
      }
    }, [searchTerm, listaOrganizaciones]);

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

        // Resto del código de manejo de respuesta...
      } catch (error) {
        console.error('Error al guardar la organización:', error);
      }
    };





    console.log('listaOrganizaciones: \n', listaOrganizaciones);

    const handleUserClick = (id) => {
      // Redireccionar a la página de detalle del usuario con el ID correspondiente
      window.location.href = `/organizaciones/${id}`;
    };

    return (
      <Container className='mt-3'>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Lista de Organizaciones</h1>
        <br />

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Form.Group controlId="formSearch">
            <InputGroup>
              <InputGroup.Text id="inputGroup-sizing-default">
                Búscar
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, dirección, telefono o email"
              />
            </InputGroup>
          </Form.Group>
          <Button style={{ fontWeight: 'bold', margin: '15px' }} variant="success" size="lg" onClick={() => handleShowModal()}>Agregar Organización</Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#101488', color: '#ffffff', borderTopLeftRadius: '5px'}} >ID</th>
              <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >Nombre</th>
              <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >Logo</th>
              <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >Dirección</th>
              <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >telefono</th>
              <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >Email</th>
              <th style={{borderTopRightRadius: '5px', backgroundColor: '#101488', color: '#ffffff' }} >Descripción</th>
            </tr>
          </thead>
          <tbody>
            {filteredData ? (
              filteredData.map((organizacion) => (
                <tr key={organizacion.id_organizacion}
                  onClick={() => handleUserClick(organizacion.id_organizacion)}
                  style={{ cursor: 'pointer' }}>
                  <td>{organizacion.id_organizacion}</td>
                  <td>{organizacion.nombre}</td>
                  <td>
                    {/* Usa la URL base junto con la ruta relativa almacenada en organizacion.imagen */}
                    {organizacion.imagen && (
                      <img src={`${serverURL}${organizacion.imagen}`} alt={organizacion.nombre} style={{ maxWidth: '60px' }} />
                    )}
                  </td>
                  <td>
                    <Link
                      href={`https://www.google.com/maps/search/${encodeURIComponent(organizacion.direccion)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {organizacion.direccion}
                    </Link>
                  </td>
                  <td>{organizacion.telefono}</td>
                  <td>{organizacion.email}</td>
                  <td>{organizacion.descripcion}</td>
                </tr>
              ))
            ) : null}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{formData.id ? 'Editar Organización' : 'Agregar Organización'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} className='bordesito' >

              <Row>
                <Col >

                  <Form.Group controlId="formName">
                    <Form.Group className="" controlId="exampleForm.ControlInput1">
                      <Form.Label>Nombre de la Organización*</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        required
                        onChange={handleChange}
                        placeholder="Organización Ejemplo" />
                    </Form.Group>
                  </Form.Group>

                  <Form.Group controlId="formDomicilio">
                    <Form.Group className="" controlId="exampleForm.ControlInput1">
                      <Form.Label>Dirección*</Form.Label>
                      <Form.Control
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        required
                        onChange={handleChange}
                        placeholder="Av Ejemplo 123" />
                    </Form.Group>
                  </Form.Group>


                  <Form.Group controlId="formNumber">
                    <Form.Group className="" controlId="exampleForm.ControlInput1">
                      <Form.Label>Número de Teléfono*</Form.Label>
                      <Form.Control
                        type="number"
                        name="telefono"
                        value={formData.telefono}
                        required
                        onChange={handleChange}
                        placeholder="3764221122" />
                    </Form.Group>
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Group className="" controlId="exampleForm.ControlInput1">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        required
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com" />
                    </Form.Group>
                  </Form.Group>

                </Col>

                <Col md>
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


                <button className='buttonRegistrar' type="submit">
                  Registrar Organización
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal que avisa si creo la organizacion */}
        <Modal show={showSuccessAlert} onHide={() => setShowSuccessAlert(false)}>
          <Modal.Header closeButton>
            <Modal.Title>¡Organización Creada!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            La organización se ha creado exitosamente.
          </Modal.Body>
        </Modal>

      </Container>
    );
  };

  export default ListaOrganizaciones;
