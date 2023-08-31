"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Modal, FormSelect } from 'react-bootstrap';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import instance, { serverURL } from '@/app/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const RegistroServiciosRealizados = () => {

  const [isFormValid, setIsFormValid] = useState(false);
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [organizaciones, setOrganizaciones] = useState([]);
  const [servicios, setServicios] = useState([]);
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

  const genreDB = ['masculino', 'femenino', 'noBinario', 'noDecir'];
  const genreView = ['Masculino', 'Femenino', 'No Binario', 'Prefiero no Decirlo'];

  const fetchDepartamentos = async () => {
    try {
      const response = await fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=54&campos=id,nombre&max=17`);
      const data = await response.json();
      // console.log('Departamentos Response:', response);
      // console.log('Parsed Data:', data);
      return data.departamentos || [];
    } catch (error) {
      console.error('Error fetching departamentos:', error); // Log the error
      return [];
    }
  };

  const fetchLocalidades = async (departamentoId) => {
    try {
      const response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${departamentoId}`);
      const data = await response.json();
      // console.log('Localidades Response:', data);
      return data.localidades || [];
    } catch (error) {
      console.error('Error fetching localidades:', error); // Log the error
      return [];
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const departamentosData = await fetchDepartamentos();
        const sortedDepartamentos = departamentosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setDepartamentos(sortedDepartamentos);

        // Fetch localidades based on the selectedDepartamento
        if (selectedDepartamento) {
          const localidadesData = await fetchLocalidades(selectedDepartamento);
          const sortedLocalidades = localidadesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setLocalidades(sortedLocalidades);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);


  const [formData, setFormData] = useState({
    id_cliente: '',
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
    departamento: '',
    localidad: '',
    ocupacion: '',
    domicilio: '',
    id_organizacion: '',
  });

  const validateForm = () => {
    if (formData.organizacion && formData.servicio && organizacionTieneServicios) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData.organizacion, formData.servicio]);

  const searchByDNI = async (dni) => {
    setSearchInProgress(true);
    try {
      console.log('Searching by DNI:', dni);
      const response = await instance.get(`/cliente/dni/${dni}`);
      const data = response.data;
      console.log('Search Result:', data);

      const idClienteEncontrado = data.id_cliente;
      const dniClienteEncontrado = data.dni;

      const departamentoId = data.departamento;
      const localidadId = data.localidad;

      setSelectedDepartamento(departamentoId);
      setSelectedLocalidad(localidadId);

      // Actualiza el estado del formData para llenar los campos del formulario con los resultados de la búsqueda
      setFormData((prevData) => ({
        ...prevData,
        id_cliente: idClienteEncontrado,
        dni: dniClienteEncontrado,
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero || formData.genero,
        email: data.email,
        contacto: data.contacto,
        telefono: data.telefono,
        departamento: departamentoId,
        localidad: localidadId,
        ocupacion: data.ocupacion,
        domicilio: data.domicilio,
      }));

      // Obtén y llena los departamentos y localidades según los IDs
      const departamentosData = await fetchDepartamentos();
      const sortedDepartamentos = departamentosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setDepartamentos(sortedDepartamentos);

      const localidadesData = await fetchLocalidades(departamentoId);
      const sortedLocalidades = localidadesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setLocalidades(sortedLocalidades);
    } catch (error) {
      console.error('Error al buscar por DNI:', error);
    } finally {
      setSearchInProgress(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDateToSend = formData.fechaNacimiento.split('/').reverse().join('-');

      const id_cliente = formData.id_cliente;
      if (!id_cliente) {
        // Si no hay un id_cliente

        const nuevoClienteData = {
          fechaNacimiento: formattedDateToSend,
          apellido: formData.apellido,
          nombre: formData.nombre,
          dni: formData.dni,
          genero: formData.genero,
          email: formData.email,
          contacto: formData.contacto,
          telefono: formData.telefono,
          departamento: formData.departamento,
          localidad: formData.localidad,
          ocupacion: formData.ocupacion,
          domicilio: formData.domicilio,
        };
        // Realiza el POST para registrar el nuevo cliente
        console.log('Datos nuevo cliente:', nuevoClienteData);
        const nuevoClienteResponse = await instance.post('/cliente/registrar', nuevoClienteData);

        // Obtén el dni del nuevo cliente registrado
        const dniNuevoCliente = nuevoClienteResponse.data.dni;
        console.log('dniNuevoCliente: ', dniNuevoCliente);

        // Realiza el POST para registrar el servicio con el nuevo cliente
        const servRealResponse = await instance.post('/serv_real/registrar_con_cliente', {
          dni: dniNuevoCliente,
          id_servicio: formData.servicio,
        });

        console.log('Servicio registrado con nuevo cliente', servRealResponse.data);
      } else {
        if (formData.dni && formData.servicio) {
          // Ahora puedes usar el id_cliente para realizar el POST con cliente existente
          await instance.post('/serv_real/registrar_con_cliente', {
            dni: formData.dni,
            id_servicio: formData.servicio,
          });

          console.log('Servicio registrado con cliente existente');
        } else {
          console.log('Selecciona un servicio y carga los datos del cliente');
        }

        console.log('Saving changes');
        // Fetch updated services and close modal
        fetchServicios();
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleDepartamentoChange = async (departamentoId) => {
    console.log('handleDepartamentoChange triggered with departamentoId:', departamentoId);

    setSelectedDepartamento(departamentoId);
    setSelectedLocalidad('');

    const localidadesData = await fetchLocalidades(departamentoId);
    // console.log('Localidades Data:', localidadesData);
    const sortedLocalidades = localidadesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setLocalidades(sortedLocalidades);

    setFormData((prevData) => ({
      ...prevData,
      departamento: departamentoId,
      localidad: '',
    }));
    console.log('Departamento: ', departamentoId);
  };

  const handleLocalidadChange = async (localidad_id) => {
    setSelectedLocalidad(localidad_id);

    setFormData((prevData) => ({
      ...prevData,
      localidad: localidad_id,
    }));
    console.log('Localidad:', localidad_id);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === 'fechaNacimiento') {
      setFormData((prevData) => ({
        ...prevData,
        fechaNacimiento: value, // Mantén la fecha en el formato aaaa-mm-dd
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const dbDate = new Date(formData.fechaNacimiento);
  const formattedDate = `${dbDate.getDate()}/${dbDate.getMonth() + 1}/${dbDate.getFullYear()}`;


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
      servicio: '', // Reset the selected service when the organization changes
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
        // console.log('Organizaciones:', response.data); // Add this console.log
      } catch (error) {
        console.error('Error al obtener las organizaciones:', error);
      }
    };

    const fetchServicios = async () => {
      try {
        const response = await instance.get('/servicios');
        setServicios(response.data);
        // console.log('Servicios:', response.data); // Add this console.log
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
        nombre: modalFormData.nombre,
        descripcion: modalFormData.descripcion,
        id_organizacion: modalFormData.id_organizacion,
      };

      console.log('Data to send:', dataToSend);

      if (selectedService.id_servicio) {
        await instance.put(`/servicios/${selectedService.id_servicio}`, dataToSend);
        console.log('Service edited successfully');
      } else {
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

          <div className='d-flex flex-wrap justify-content-between tablet-width'>
            <h1 className='titulo text-nowrap'>Registrar Servicio</h1>
            <div className='d-flex'>

              <Link href="/admin/servicios/crudServicios">
                <button className='buttonRegistrar responsive-buttons' >
                  Administrar
                </button>
              </Link>
              <Link href="/admin/servicios/historial">
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
              <FormSelect
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                as="select"
                name='organizacion'
                value={formData.organizacion}
                onChange={(e) => {
                  console.log('Selected Organizacion ID:', e.target.value);
                  setFormData({ ...formData, organizacion: e.target.value });
                  handleOrganizacionChange(e.target.value);
                }}
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
              >
                <option value="">Seleccionar Servicio</option>
                {organizacionTieneServicios ? (
                  organizacionServicios.map((servicio) => (
                    <option key={servicio.id_servicio} value={servicio.id_servicio}>
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
              <Form.Group className="mt-5 mb-5" controlId="exampleForm.ControlInput1">
                <div className="input-group">
                  <Form.Control
                    className="border-secondary rounded rounded-1.1 shadow "
                    type="number"
                    as="input"
                    name="dni"
                    value={formData.dni}
                    required={!searchInProgress}
                    onChange={handleInputChange}
                    placeholder="DNI"
                  />

                  <button
                    style={{ marginLeft: '0.5rem', borderRadius: '5px' }}
                    className="buscarbutton"
                    onClick={(e) => {
                      e.preventDefault();
                      searchByDNI(formData.dni);
                    }
                    }
                  >

                    <FontAwesomeIcon icon={faSearch} style={{ color: "#FFFF", }} />

                  </button>
                </div>
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
                  required={!searchInProgress}
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
                  required={!searchInProgress}
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
                  value={formData.fechaNacimiento} // Usa el valor sin formatear
                  required={!searchInProgress}
                  onChange={handleInputChange}
                  placeholder="dd/mm/aaaa"
                />

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
                required={!searchInProgress}
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

          </Col>
          <Col md>

            <Form.Group controlId="formContacto">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Contacto</Form.Label> */}
                <Form.Control
                  className='border border-secondary rounded rounded-1.1 shadow mt-5'
                  type="number"
                  name="contacto"
                  value={formData.contacto}
                  required={!searchInProgress}
                  onChange={handleInputChange}
                  placeholder="Contacto" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formTelefoono">
              <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Teléfono</Form.Label> */}
                <Form.Control
                  className='border border-secondary rounded rounded-1.1 shadow mt-5'
                  type="number"
                  name="telefono"
                  value={formData.telefono}
                  required={!searchInProgress}
                  onChange={handleInputChange}
                  placeholder="Telefono" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formDepartamento">
              <FormSelect
                className='border border-secondary rounded rounded-1.1 shadow mt-5'
                as="select"
                name='departamento'
                value={formData.departamento}
                onChange={(e) => {
                  handleDepartamentoChange(e.target.value);
                }}
                required={!searchInProgress}
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
              <FormSelect
                className='border border-secondary rounded rounded-1.1 shadow mt-5 mt-3'
                as="select"
                name='localidad'
                value={selectedLocalidad} // Make sure this value matches the initial value
                onChange={(e) => {
                  handleLocalidadChange(e.target.value);
                }}
                required={!searchInProgress}
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
                  required={!searchInProgress}
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
                  required={!searchInProgress}
                  onChange={handleInputChange}
                  placeholder="Ocupacion" />
              </Form.Group>
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button type="submit" className='bouttoncancel'>
                Cancelar
              </button>

              <button className='buttonRegistrar' type="submit" disabled={!isFormValid}>
                Registrar Servicio
              </button>
            </div>

          </Col>
        </Row>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleModalSubmit}>
            <Form.Group controlId="formName">
              {/* <Form.Label>Nombre del Servicio*</Form.Label> */}
              <Form.Control
                className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                type="text"
                as='input'
                name="nombre"
                required
                placeholder='Nombre del Servicio'
                value={modalFormData.nombre}
                onChange={handleModalInputChange}
              />
            </Form.Group>


            <Form.Group controlId="formOrganizacion">
              {/* <Form.Label>Organización*</Form.Label> */}
              <InputGroup >
                <Form.Control
                  as="select"
                  className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                  placeholder='Organización'
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
                className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                // placeholder='Descripción del Servicio'
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