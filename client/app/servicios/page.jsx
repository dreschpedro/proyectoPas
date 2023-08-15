"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Modal, FormSelect } from 'react-bootstrap';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import instance from '../axiosConfig.js';


const fetchProvincias = async () => {
  try {
    const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
    const data = await response.json();
    return data.provincias || [];
  } catch (error) {
    console.error('Error al obtener las provincias:', error);
    return [];
  }
};

const fetchDepartamentos = async (provinciaId) => {
  try {
    const response = await fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${provinciaId}`);
    const data = await response.json();
    return data.departamentos || [];
  } catch (error) {
    console.error('Error al obtener los departamentos:', error);
    return [];
  }
};

const fetchLocalidades = async (departamentoId) => {
  try {
    const response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${departamentoId}`);
    const data = await response.json();
    return data.localidades || [];
  } catch (error) {
    console.error('Error al obtener las localidades:', error);
    return [];
  }
};


const RegistroServiciosRealizados = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [servicios, setServicios] = useState([]); // Inicializar aquí
  const [selectedOrganizacion, setSelectedOrganizacion] = useState('');
  const [filteredOrganizaciones, setFilteredOrganizaciones] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [modalFormData, setModalFormData] = useState({
    nombre: '',
    descripcion: '',
  });
  const [serviceInfo, setServiceInfo] = useState({
    nombre: '',
    descripcion: '',
    dni: '',
    fechaNacimiento: '',
    ocupacion: '',
    domicilioReal: '',
    hijos: '',
    trabajo: '',
    subsidio: '',
    id_organizacion: '',
    Organizacion: '', // Combobox para la organizacion que realiza el servicio
  });
  const [formData, setFormData] = useState({
    apellido: '',
    nombre: '',
    descripcion: '',
    dni: '',
    fechaNacimiento: '',
    ocupacion: '',
    domicilioReal: '',
    hijos: '',
    trabajo: '',
    genero: '',
    subsidio: '',
    id_organizacion: '',
    Organizacion: '',
  });

  useEffect(() => {
    const fetchProvinciasSorted = async () => {
      const provinciasData = await fetchProvincias();
      const sortedProvincias = provinciasData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setProvincias(sortedProvincias);
    };

    fetchProvinciasSorted();
  }, []);

  const handleProvinciaChange = async (provinciaId) => {
    const departamentosData = await fetchDepartamentos(provinciaId);
    const sortedDepartamentos = departamentosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setDepartamentos(sortedDepartamentos);
    setLocalidades([]);
  };

  const handleDepartamentoChange = async (departamentoId) => {
    const localidadesData = await fetchLocalidades(departamentoId);
    const sortedLocalidades = localidadesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setLocalidades(sortedLocalidades);
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
        setServicios(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchOrganizaciones();
    fetchServicios();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModalInputChange = (event) => {
    const { name, value } = event.target;
    setModalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log('Modal form data:', modalFormData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nombre: modalFormData.nombre, // Usa modalFormData.nombre
        descripcion: selectedService.descripcion,
        id_organizacion: serviceInfo.id_organizacion,
      };

      console.log('Data to send:', dataToSend); // Agregar este console.log

      if (selectedService.id_servicio) {
        // Edit an existing service
        await instance.put(`/servicios/${selectedService.id_servicio}`, dataToSend);
        console.log('Service edited successfully');
      } else {
        // Add a new service
        const response = await instance.post('/servicios/registrar', dataToSend);
        console.log(response.data.message);
      }

      console.log('Saving changes');
      // Fetch updated services and close modal
      fetchServices();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };


  const setOrganizacionValue = (organizacionId) => {
    setServiceInfo((prevServiceInfo) => ({
      ...prevServiceInfo,
      id_organizacion: organizacionId,
    }));
  };
  const handleServiceChange = (e) => {
    setSelectedService({
      ...selectedService,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShowModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
    // Additional code to set initial values if editing an existing service
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <>
      <Row>

        <Col>


          <div className='d-flex flex-nowrap'>
            <h1 className='titulo'>Registrar Servicio</h1>
            <div >

              <Link href="/servicios/crudServicios">
                <button className='buttonRegistrar' style={{ marginLeft: '10em', margin: '10px', marginTop: '5.5rem' }}>
                  Administrar
                </button>
              </Link>
              <Link href="/servicios/historial">
                <button className='bouttoncancel' style={{ margin: '10px', marginTop: '5.5rem' }}>
                  Historial
                </button>
              </Link>
            </div>
          </div>
        </Col>


      </Row>
      <Form onSubmit={handleSubmit} className='bordesito' >

        <Row>
          <Col>
            {/* Seleccionar Organizacion y Servicio */}

            <Form.Group controlId="formOrganizacion">
              <Form.Label>Organización*</Form.Label>
              <FormSelect className="mb-3"
                as="select"
                name='organizacion'
                value={serviceInfo.Organizacion}
                onChange={(e) => setServiceInfo({ ...serviceInfo, Organizacion: e.target.value })}
                required
              >
                <option value="">Seleccionar Organización</option>
                {organizaciones.map((organizacion) => (
                  <option key={organizacion.id} value={organizacion.id}>
                    {organizacion.nombre}
                  </option>
                ))}
              </FormSelect>
            </Form.Group>

            <Form.Group controlId="formServicio">
              <Form.Label>Servicio*</Form.Label>
              <FormSelect className="mb-3"
                name='servicio'
                as="select"
                value={serviceInfo.Servicio}
                onChange={(e) => setServiceInfo({ ...serviceInfo, Servicio: e.target.value })}
                required>

                <option value="">Seleccionar Servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio.id} value={servicio.id}>
                    {servicio.nombre}
                  </option>
                ))}
              </FormSelect>
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button onClick={handleShowModal} className='buttonRegistrar'>
                Nuevo Servicio
              </button>
            </div>

          </Col>
        </Row>
      </Form>
      <Form onSubmit={handleSubmit} className='bordesito' >

        <Row>
          <h1 className='titulo'>Información</h1>
          <Col md>

            <Form.Group controlId="formApellido">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formDNI">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="number"
                  as="input"
                  name="dni"
                  value={formData.dni}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Fecha Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formGenero">
              <Form.Label>Género</Form.Label>
              <FormSelect className="mb-3"
                as="select"
                name='genero'
                value={serviceInfo.Organizacion}
                onChange={(e) => setServiceInfo({ ...serviceInfo, Organizacion: e.target.value })}
                required
              >
                <option value=""> Seleccione el Género </option>

                <option key="masculino" value="masculino"> Masculino </option>
                <option key="femenino" value="femenino"> Femenino </option>
                <option key="noBinario" value="noBinario"> No Binario </option>
                <option key="noDecir" value="noDecir"> Prefiero no decirlo </option>
              </FormSelect>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email (Opcional)</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>


          </Col>


          <Col md>

            <Form.Group controlId="formContacto">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Contacto</Form.Label>
                <Form.Control
                  type="number"
                  name="contacto"
                  value={formData.contacto}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formTelefoono">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="number"
                  name="telefono"
                  value={formData.telefono}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formProvincia">
              <Form.Label>Provincia</Form.Label>
              <FormSelect
                as="select"
                name='provincia'
                value={serviceInfo.provincia}
                onChange={(e) => {
                  setServiceInfo({ ...serviceInfo, provincia: e.target.value });
                  handleProvinciaChange(e.target.value);
                }}
                required
              >
                <option value="">Seleccione la Provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.nombre}
                  </option>
                ))}
              </FormSelect>
            </Form.Group>

            <Form.Group controlId="formDepartamento">
              <Form.Label>Departamento</Form.Label>
              <FormSelect
                as="select"
                name='departamento'
                value={serviceInfo.departamento} // Update the selected department value
                onChange={(e) => {
                  setServiceInfo({ ...serviceInfo, departamento: e.target.value }); // Update the selected department in serviceInfo
                  handleDepartamentoChange(e.target.value);
                }}
                required
              >
                <option value="">Seleccione el Departamento</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.nombre}
                  </option>
                ))}
              </FormSelect>
            </Form.Group>


            <Form.Group controlId="formLocalidad">
              <Form.Label>Localidad</Form.Label>
              <FormSelect
                as="select"
                name='localidad'
                value={serviceInfo.localidad}
                onChange={(e) => setServiceInfo({ ...serviceInfo, localidad: e.target.value })}
                required
              >
                <option value="">Seleccione la Localidad</option>
                {localidades.map((localidad) => (
                  <option key={localidad.id} value={localidad.id}>
                    {localidad.nombre}
                  </option>
                ))}
              </FormSelect>
            </Form.Group>


            <Form.Group controlId="formDomicilio">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Domicilio</Form.Label>
                <Form.Control
                  type="text"
                  name="domicilio"
                  value={formData.domicilio}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formProfesion">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ocupacion</Form.Label>
                <Form.Control
                  className='shadow-right'
                  type="text"
                  name="profesion"
                  value={formData.profesion}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

          </Col>


        </Row>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
          <button type="submit" className='bouttoncancel'>
            Cancelar
          </button>

          <button className='buttonRegistrar' type="submit">
            Registrar Servicio
          </button>
        </div>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService ? 'Edit Service' : 'Add Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre del Servicio*</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                required
                value={modalFormData.nombre}
                onChange={handleModalInputChange}
              />
            </Form.Group>


            <Form.Group controlId="formOrganizacion">
              <Form.Label>Organización*</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
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
                as="textarea"
                name="descripcion"
                value={selectedService?.descripcion || ''}
                onChange={handleServiceChange}
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button
                className='bouttoncancel'
                type="button"
                onClick={handleCloseModal}>
                Cerrar
              </button>
              <button
                className='buttonRegistrar'
                type="submit">
                Agregar Servicio
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegistroServiciosRealizados;
