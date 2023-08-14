"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import instance from '../../axiosConfig';

const RegistroServiciosRealizados = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [servicios, setServicios] = useState([]); // Inicializar aquí
  const [selectedOrganizacion, setSelectedOrganizacion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrganizaciones, setFilteredOrganizaciones] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

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


  const [serviceInfo, setServiceInfo] = useState({
    dni: '',
    fechaNacimiento: '',
    ocupacion: '',
    domicilioReal: '',
    hijos: '',
    trabajo: '',
    subsidio: '',
    Organizacion: '', // Combobox para la organizacion que realiza el servicio
  });

  // Funciones para manejar el mostrar y cerrar la ventana modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('descripcion', formData.descripcion);

      console.log('Datos enviados al backend:', formDataToSend);

      const response = await instance.post('/servicios/registrar', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      handleCloseModal(true)

      // Resto del código de manejo de respuesta...
    } catch (error) {
      console.error('Error al registrar el Servicio:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <>
      <Row>

        <Col>


          <div className='d-flex flex-nowrap'>
          <h1 className='titulo'>Registrar Servicio</h1> 
          <div >

            <Link href="/servicios/crudServicios">
              <button className='buttonRegistrar' style={{ marginLeft: '10em', margin: '10px' , marginTop: '5.5rem'}}>
                Administrar
              </button>
            </Link>
            <Link href="/servicios/historial">
              <button className='bouttoncancel' style={{ margin: '10px' , marginTop: '5.5rem'}}>
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
              <InputGroup className="mb-3">
                <Form.Control
                  as="select"
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
                </Form.Control>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formServicio">
              <Form.Label>Servicio*</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  as="select"
                  value={serviceInfo.Servicio}
                  onChange={(e) => setServiceInfo({ ...serviceInfo, Servicio: e.target.value })}
                  required
                >
                  <option value="">Seleccionar Servicio</option>
                  {servicios.map((servicio) => (
                    <option key={servicio.id} value={servicio.id}>
                      {servicio.nombre}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button type="submit" className='buttonRegistrar'>
                Nuevo Servicio
              </button>
            </div>
          </Col>
        </Row>


        <Row>
          <h1 className='titulo'>Información</h1>
          <Col md>

            <Form.Group controlId="formName">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre*</Form.Label>
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
                <Form.Label>DNI*</Form.Label>
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
                <Form.Label>Fecha Nacimiento*</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formProfesion">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ocupacion*</Form.Label>
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


          <Col md>

            <Form.Group controlId="formDomicilio">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Domicilio*</Form.Label>
                <Form.Control
                  type="text"
                  name="domicilio"
                  value={formData.domicilio}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formHijos">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Hijos*</Form.Label>
                <Form.Control
                  type="number"
                  as="input"
                  name="hijos"
                  value={formData.hijos}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formTrabajo">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Trabajo*</Form.Label>
                <Form.Control
                  type="text"
                  name="trabajo"
                  value={formData.trabajo}
                  required
                  onChange={handleInputChange}
                  placeholder="" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formApe">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Subsidio*</Form.Label>
                <Form.Control
                  type="text"
                  name="Ssbsidio"
                  value={formData.subsidio}
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
    </>
  );
}

export default RegistroServiciosRealizados;
