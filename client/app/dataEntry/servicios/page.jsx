"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Modal, FormSelect } from 'react-bootstrap';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import instance, { serverURL } from '@/app/axiosConfig';


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

const genreDB = ['masculino', 'femenino', 'noBinario', 'noDecir'];
const genreView = ['Masculino', 'Femenino', 'No Binario', 'Prefiero no Decirlo'];

const RegistroServiciosRealizados = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [organizaciones, setOrganizaciones] = useState([]);
  const [servicios, setServicios] = useState([]); // Inicializar aquí
  const [searchResult, setSearchResult] = useState(null);
  const [provincias, setProvincias] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [organizacionServicios, setOrganizacionServicios] = useState([]);
  const [organizacionTieneServicios, setOrganizacionTieneServicios] = useState(true);
  const [modalFormData, setModalFormData] = useState({
    nombre: '',
    descripcion: '',
    organizacion: '',
    id_organizacion: '',
  });

  const [formData, setFormData] = useState({
    organizacion: '',
    servicio: '',
    apellidos: '',
    nombre: '',
    dni: '',
    fechaNacimiento: '',
    genero: '',
    email: '',
    contacto: '',
    telefono: '',
    provincia: '',
    departamento: '',
    localidad: '',
    ocupacion: '',
    domicilio: '',
    id_organizacion: '',
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
    console.log('Selected Provincia:', provinciaId); // Add this console.log
    const departamentosData = await fetchDepartamentos(provinciaId);
    console.log('Departamentos Data:', departamentosData);
    const sortedDepartamentos = departamentosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setDepartamentos(sortedDepartamentos);
    setLocalidades([]);


    // Actualizar servicios relacionados con la organización seleccionada
    const selectedOrganizacion = organizaciones.find(org => org.id_organizacion === provinciaId);
    if (selectedOrganizacion) {
      const serviciosDeOrganizacion = servicios.filter(servicio => servicio.id_organizacion === selectedOrganizacion.id_organizacion);
      console.log('Servicios de Organización:', serviciosDeOrganizacion); // Add this console.log
      setOrganizacionServicios(serviciosDeOrganizacion);
      setOrganizacionTieneServicios(serviciosDeOrganizacion.length > 0);
    } else {
      console.log('Selected Organizacion: No se encontró la organización');
      setOrganizacionServicios([]);
      setOrganizacionTieneServicios(false);
    }
  };

  const handleDepartamentoChange = async (departamentoId) => {
    console.log('Selected Departamento:', departamentoId); // Add this console.log
    const localidadesData = await fetchLocalidades(departamentoId);
    console.log('Localidades Data:', localidadesData); // Add this console.log
    const sortedLocalidades = localidadesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setLocalidades(sortedLocalidades);

  };

  const handleLocalidadChange = async (localidad_id) => {
    console.log('Selected Localidad:', localidad_id); // Add this console.log
  };


  const searchByDNI = async (dni) => {
    try {
      console.log('Searching by DNI:', dni);
      const response = await instance.get(`/cliente/dni/${dni}`);
      const data = response.data;

      // Update the formData state to fill the form fields with search results
      setFormData((prevData) => ({
        ...prevData,
        dni: data.dni,
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero || formData.genero, // Keep the current formData.genero if data.genero is null
        email: data.email,
        contacto: data.contacto,
        telefono: data.telefono,
        provincia: data.provinciaId,
        departamento: data.departamentoId,
        localidad: data.localidadId,
        ocupacion: data.ocupacion,
        domicilio: data.domicilio,
      }));
    } catch (error) {
      console.error('Error al buscar por DNI:', error);
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Search by DNI and fill the form fields
    if (name === 'dni') {
      searchByDNI(value);
    }

    if (name === 'fechaNacimiento') {
      // Convierte la fecha de "dd/mm/aaaa" a un objeto Date
      const parts = value.split('/');
      const year = parseInt(parts[2], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[0], 10);
      const date = new Date(year, month, day);
      setFormData((prevData) => ({
        ...prevData,
        [name]: date.toString(), // Convierte la fecha a formato "aaaa-mm-dd"
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };




  // Convierte la fecha de la base de datos al formato "dd/mm/aaaa"
  const dbDate = new Date(formData.fechaNacimiento);
  const formattedDate = `${dbDate.getDate()}/${dbDate.getMonth() + 1}/${dbDate.getFullYear()}`;



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        organizacion: formData.organizacion,
        servicio: formData.servicio,
        apellidos: formData.apellidos,
        nombre: formData.nombre,
        dni: formData.dni,
        fechaNacimiento: formData.fechaNacimiento,
        genero: formData.genero,
        email: formData.email,
        contacto: formData.contacto,
        telefono: formData.telefono,
        provinciaId: formData.provincia,
        departamentoId: formData.departamento,
        localidadId: formData.localidad,
        ocupacion: formData.ocupacion,
        domicilio: formData.domicilio,
        id_organizacion: formData.id_organizacion,
      };

      console.log('Data to send:', dataToSend); // Agregar este console.log

      if (selectedService.id_servicio) {
        await instance.put(`/cliente/${selectedService.id_servicio}`, dataToSend);
        console.log('Service edited successfully');
      } else {
        // Add a new service
        const response = await instance.post('/cliente/registrar', dataToSend);
        console.log(response.data.message);
      }

      console.log('Saving changes');
      // Fetch updated services and close modal
      fetchServicios();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const setModalOrganizacionValue = (organizacionId) => {
    setModalFormData((prevModalFormData) => ({
      ...prevModalFormData,
      id_organizacion: organizacionId,
    }));
  };

  const fetchServiciosPorOrganizacion = async (organizacionId) => {
    try {
      const response = await instance.get(`/servicios/organizacion/${organizacionId}`);
      const servicios = response.data;
      setOrganizacionServicios(servicios);
      setOrganizacionTieneServicios(servicios.length > 0);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  const handleOrganizacionChange = async (organizacionId) => {
    setFormData((prevServiceInfo) => ({
      ...prevServiceInfo,
      id_organizacion: organizacionId,
    }));

    // Llamada a la función para obtener servicios por organización
    fetchServiciosPorOrganizacion(organizacionId);

    // Buscar la organización seleccionada
    const selectedOrganizacion = organizaciones.find(org => org.id_organizacion === organizacionId);

    if (selectedOrganizacion) {
      console.log('Selected Organizacion ID:', selectedOrganizacion.id_organizacion);
    } else {
      console.log('Selected Organizacion: No se encontró la organización');
    }
  };

  const handleShowModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
    // Additional code to set initial values if editing an existing service
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchOrganizaciones = async () => {
      try {
        const response = await instance.get('/organizaciones');
        setOrganizaciones(response.data);
        console.log('Organizaciones:', response.data); // Agregar este console.log
      } catch (error) {
        console.error('Error al obtener las organizaciones:', error);
      }
    };

    const fetchServicios = async () => {
      try {
        const response = await instance.get('/servicios');
        setServicios(response.data);
        console.log('Servicios:', response.data); // Agregar este console.log
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchOrganizaciones();
    fetchServicios();
  }, []);

  const handleModalInputChange = (event) => {
    const { name, value } = event.target;
    setModalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log('Modal form data:', modalFormData);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nombre: modalFormData.nombre, // Usa modalFormData.nombre
        descripcion: modalFormData.descripcion,
        id_organizacion: modalFormData.id_organizacion,
      };

      console.log('Data to send:', dataToSend); // Agregar este console.log

      if (selectedService.id_servicio) {
        await instance.put(`/servicios/${selectedService.id_servicio}`, dataToSend);
        console.log('Service edited successfully');
      } else {
        // Add a new service
        const response = await instance.post('/servicios/registrar', dataToSend);
        console.log(response.data.message);
      }

      console.log('Saving changes');
      // Fetch updated services and close modal
      fetchServicios();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving changes:', error);
    }




  };



  return (
    <>
      <Row>
        <Col>

          <div className='d-flex flex-wrap'>
            <h1 className='titulo'>Registrar Servicio</h1>
            <div style={{ margin: 'auto' }} className='d-flex '>

              <Link href="/servicios/crudServicios">
                <button className='buttonRegistrar responsive-buttons' style={{ marginLeft: '10em' }}>
                  Administrar
                </button>
              </Link>
              <Link href="/servicios/historial">
                <button className='bouttoncancel responsive-buttons' >
                  Historial
                </button>
              </Link>
            </div>
          </div>
        </Col>


      </Row>
      <Form onSubmit={handleSubmit} className='bordesito tablet-width'>

        <Row>
          <Col>
            {/* Seleccionar Organizacion y Servicio */}

            <Form.Group controlId="formOrganizacion">
              {/* <Form.Label>Organización*</Form.Label> */}
              <FormSelect className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                as="select"
                name='organizacion'
                value={formData.organizacion}
                onChange={(e) => {
                  console.log('Selected Organizacion ID:', e.target.value);
                  setFormData({ ...formData, organizacion: e.target.value });
                  handleOrganizacionChange(e.target.value);
                }}
                required
              >

                <option value="">Seleccionar Organización</option>
                {organizaciones.map((organizacion) => (
                  <option key={organizacion.id_organizacion} value={organizacion.id_organizacion}>
                    {organizacion.nombre}
                  </option>
                ))}
              </FormSelect>
            </Form.Group>

            <Form.Group controlId="formServicio">
              {/* <Form.Label>Servicio*</Form.Label> */}
              <FormSelect className="mt-5 mt-3 border border-secondary rounded rounded-1.1 shadow"
                name='servicio'
                as="select"
                value={formData.servicio}
                onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                required
              >
                <option value="">Seleccionar Servicio</option>
                {organizacionTieneServicios ? (
                  organizacionServicios.map((servicio) => (
                    <option key={servicio.id} value={servicio.id}>
                      {servicio.nombre}
                    </option>
                  ))
                ) : (
                  <option disabled>No tiene servicios registrados</option>
                )}
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


      <h1 className='titulo'>Información</h1>

      <Form onSubmit={handleSubmit} className='bordesito' >

        <Row>
          
          <Col md>

            <Form.Group controlId="formDNI">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>DNI</Form.Label> */}
                <Form.Control
                  className='border border-secondary rounded rounded-1.1 shadow mb-5'
                  type="number"
                  as="input"
                  name="dni"
                  value={formData.dni}
                  required
                  onChange={handleInputChange}
                  placeholder="DNI"
                />
              </Form.Group>
            </Form.Group>


            <Form.Group controlId="formApellido">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Apellidos</Form.Label> */}
                <Form.Control
                className='border border-secondary rounded rounded-1.1 shadow mb-5'
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  required
                  onChange={handleInputChange}
                  placeholder="Apellidos" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Nombres</Form.Label> */}
                <Form.Control
                className='border border-secondary rounded rounded-1.1 shadow mt-5'
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  required
                  onChange={handleInputChange}
                  placeholder="Nombres" />
              </Form.Group>
            </Form.Group>



            <Form.Group controlId="formName">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Fecha Nacimiento</Form.Label> */}
                <Form.Control
                className='border border-secondary rounded rounded-1.1 shadow mt-5'
                  type="date"
                  name="fechaNacimiento"
                  value={formattedDate}
                  required
                  onChange={handleInputChange} // Asegúrate de actualizar la función handleInputChange
                  placeholder="dd/mm/aaaa" />
              </Form.Group>
            </Form.Group>


            <Form.Group controlId="formGenero">
              {/* <Form.Label>Género</Form.Label> */}
              <FormSelect
                className='border border-secondary rounded rounded-1.1 shadow mt-5'
                as="select"
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione el Género</option>
                {genreDB.map((genero, index) => (
                  <option key={genero} value={genero}>
                    {genreView[index]}
                  </option>
                ))}
              </FormSelect>
            </Form.Group>



            <Form.Group controlId="formEmail">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Email (Opcional)</Form.Label> */}
                <Form.Control
                className='border border-secondary rounded rounded-1.1 shadow mt-5'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formContacto">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Contacto</Form.Label> */}
                <Form.Control
                  className='border border-secondary rounded rounded-1.1 shadow mt-5'
                  type="number"
                  name="contacto"
                  value={formData.contacto}
                  required
                  onChange={handleInputChange}
                  placeholder="Contacto" />
              </Form.Group>
            </Form.Group>

          </Col>
          <Col md>

            <Form.Group controlId="formTelefoono">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Teléfono</Form.Label> */}
                <Form.Control
                  className='border border-secondary rounded rounded-1.1 shadow mt-5'
                  type="number"
                  name="telefono"
                  value={formData.telefono}
                  required
                  onChange={handleInputChange}
                  placeholder="Telefono" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formProvincia">
              {/* <Form.Label>Provincia</Form.Label> */}
              <FormSelect
                className='border border-secondary rounded rounded-1.1 shadow mt-5'
                as="select"
                name='provincia'
                value={formData.provincia}
                onChange={(e) => {
                  setFormData({ ...formData, provincia: e.target.value });
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
              {/* <Form.Label>Departamento</Form.Label> */}
              <FormSelect
                className='border border-secondary rounded rounded-1.1 shadow mt-5'
                as="select"
                name='departamento'
                value={formData.departamento} // Update the selected department value
                onChange={(e) => {
                  setFormData({ ...formData, departamento: e.target.value }); // Update the selected department in serviceInfo
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


            <Form.Group controlId="formLocalidad" className='mt-5'>
              {/* <Form.Label>Localidad</Form.Label> */}
              <FormSelect
                className='border border-secondary rounded rounded-1.1 shadow mt-5 mt-3'
                as="select"
                name='localidad'
                value={formData.localidad}
                onChange={(e) => {
                  setFormData({ ...formData, localidad: e.target.value });
                  handleLocalidadChange(e.target.value);
                }}
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
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Domicilio</Form.Label> */}
                <Form.Control
                  className='border border-secondary rounded rounded-1.1 shadow mt-5 mt-3'
                  type="text"
                  name="domicilio"
                  value={formData.domicilio}
                  required
                  onChange={handleInputChange}
                  placeholder="Domicilio" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formOcupacion">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Ocupacion</Form.Label> */}
                <Form.Control
                  className='border border-secondary rounded rounded-1.1 shadow mt-3'
                  type="text"
                  name="ocupacion"
                  value={formData.ocupacion}
                  required
                  onChange={handleInputChange}
                  placeholder="Ocupacion" />
              </Form.Group>
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button type="submit" className='bouttoncancel'>
                Cancelar
              </button>

              <button className='buttonRegistrar' type="submit">
                Registrar Servicio
              </button>
            </div>

          </Col>


        </Row>


      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService ? 'Edit Service' : 'Add Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleModalSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre del Servicio*</Form.Label>
              <Form.Control
                type="text"
                as='input'
                name="nombre"
                required
                value={modalFormData.nombre}
                onChange={handleModalInputChange}
              />
            </Form.Group>


            <Form.Group controlId="formOrganizacion">
              <Form.Label>Organización*</Form.Label>
              <InputGroup className="mt-5">
                <Form.Control
                  as="select"
                  value={modalFormData.id_organizacion} // Cambia a serviceInfo.id_organizacion
                  onChange={(e) => setModalOrganizacionValue(e.target.value)} // Usa setOrganizacionValue directamente
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
                value={modalFormData.descripcion}
                onChange={handleModalInputChange}
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