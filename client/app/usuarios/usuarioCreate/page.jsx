"use client"

import { Dropdown, DropdownButton } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance from '@/app/axiosConfig';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RegistroUsuarios() {

  const roles = ['Data-Entry', 'Administrador', 'Consultor'];
  const [selectedRol, setSelectedRol] = useState('');
  const [isRolSelected, setIsRolSelected] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [Organizaciones, setOrganizaciones] = useState([]);
  const [selectedOrganizacion, setSelectedOrganizacion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrganizaciones, setFilteredOrganizaciones] = useState([]);
  const [passwordMismatch, setPasswordMismatch] = useState(false);


  const [formData, setFormData] = useState({
    username: '',
    apellido: '',
    nombre: '',
    organizacion: '',
    email: '',
    imagen: '',
    rol: '',
    cuilt: '',
    telefono: '',
    domicilio: '',
    profesion: '',
  });

  useEffect(() => {
    instance.get('/organizaciones/')
      .then((response) => {
        console.log('Respuesta del backend:', response.data);
        setOrganizaciones(response.data);
      })
      .catch((error) => console.error('Error al obtener las Organizaciones:', error));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = Organizaciones.filter((organizacion) => {
        return (
          organizacion.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredOrganizaciones(filteredData);
    } else {
      setFilteredOrganizaciones([]);
    }
  }, [searchTerm, Organizaciones]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedRol) {
      setIsRolSelected(true); // Mostrar el mensaje de error
      return;
    }

    if (formData.password !== formData.password2) {
      setPasswordMismatch(true);
      return;
    } else {
      setPasswordMismatch(false); // Restablecer el estado si las contraseñas coinciden
    }


    try {
      // Obtener el id de la organización seleccionada
      const selectedOrg = Organizaciones.find(org => org.nombre === selectedOrganizacion);
      if (!selectedOrg) {
        console.error('Organización seleccionada no encontrada.');
        return;
      }
      const organizacionId = selectedOrg.id_organizacion;

      // Registrar un nuevo usuario
      const userResponse = await instance.post('/usuarios/registrar', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        rol: selectedRol,
        // ... otros campos de usuario
      });
      const userId = userResponse.data.id_usuario;

      // Registrar un nuevo registro en la tabla personal
      const personalResponse = await instance.post('/personal/registrar', {
        apellido: formData.apellido,
        nombre: formData.nombre,
        cuilt: formData.cuilt,
        domicilio: formData.domicilio,
        profesion: formData.profesion,
        telefono: formData.telefono,
        // ... otros campos de personal
        id_organizacion: organizacionId,
        id_usuario: userId,
      });

      console.log('Usuario registrado exitosamente:', personalResponse.data);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
<h1 className='titulo'>Crear cuenta</h1>
<Form onSubmit={handleSubmit} className='bordesito' >
    
    <Row>
        <Col md>

          <Form.Group controlId="formtext">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de Usuario*</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                required
                onChange={handleInputChange}
                placeholder="" />
            </Form.Group>
          </Form.Group>


          <Form.Group controlId="formPassword">
            <Form.Group className={`mb-3 ${passwordMismatch ? 'has-error' : ''}`} controlId="exampleForm.ControlInput1">
              <Form.Label>Contraseña*</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                required
                onChange={handleInputChange}
                placeholder=""
              />
              {passwordMismatch && (
                <div className="error-message">Las contraseñas no coinciden.</div>
              )}
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formPassword2">
            <Form.Group className={`mb-3 ${passwordMismatch ? 'has-error' : ''}`} controlId="exampleForm.ControlInput1">
              <Form.Label>Confirmar Contraseña*</Form.Label>
              <Form.Control
                type="password"
                name="password2"
                value={formData.password2}
                required
                onChange={handleInputChange}
                placeholder=""
              />
            </Form.Group>
          </Form.Group>


          <Form.Group controlId="formOrganizacion">
            <Form.Label>Organización*</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                name="organizacion"
                value={selectedOrganizacion}
                onChange={(e) => {
                  setSelectedOrganizacion(e.target.value);
                  setSearchTerm(e.target.value);
                }}
                required
                placeholder="Buscar y seleccionar organización"
              />
              {filteredOrganizaciones.length > 0 && (
                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-primary"
                  title="Seleccionar"
                >
                  {filteredOrganizaciones.map((org) => (
                    <Dropdown.Item
                      key={org.id_organizacion}
                      onClick={() => {
                        setSelectedOrganizacion(org.nombre);
                        setSearchTerm(org.nombre);
                      }}
                    >
                      {org.nombre}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              )}
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                // required
                onChange={handleInputChange}
                placeholder="ejemplo@correo.com" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formRol">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rol*</Form.Label>
              <DropdownButton
                title={selectedRol || 'Seleccionar Rol'}
                variant={(isRolSelected || formSubmitted) ? 'outline-danger' : 'outline-primary'}
                onSelect={(eventKey) => {
                  setSelectedRol(eventKey);
                  setIsRolSelected(false); // Restablecer el estado cuando se seleccione un rol
                }}>
                {roles.map((rol) => (
                  <Dropdown.Item key={rol} eventKey={rol}>
                    {rol}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              {(isRolSelected || formSubmitted) && !selectedRol && (
                <div style={{ color: 'red', marginTop: '0.25rem' }}>
                  Por favor, selecciona un rol.
                </div>
              )}
            </Form.Group>
          </Form.Group>

        </Col>


        <Col md>
          <Form.Group controlId="formCuilt">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CUIL o CUIT*</Form.Label>
              <Form.Control
                type="number"
                as="input"
                name="cuilt"
                value={formData.cuilt}
                required
                onChange={handleInputChange}
                placeholder="" />
            </Form.Group>
          </Form.Group>

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

          <Form.Group controlId="formApe">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellido*</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                required
                onChange={handleInputChange}
                placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formNumber">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Teléfono*</Form.Label>
              <Form.Control
                type="number"
                name="telefono"
                value={formData.telefono}
                required
                onChange={handleInputChange}
                placeholder="" />
            </Form.Group>
          </Form.Group>

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

          <Form.Group controlId="formProfesion">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profesión*</Form.Label>
              <Form.Control
                type="text"
                name="profesion"
                value={formData.profesion}
                required
                onChange={handleInputChange}
                placeholder="" />
            </Form.Group>
          </Form.Group>

        </Col>

        {/* imagen de perfil */}
        <Col md={{ order: 'last' }} xs={{ order: 'first' }}>

          <Form.Group controlId="formFile">
            <Form.Label>Subir imagen de perfil</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              value={formData.imagen}
              onChange={handleImageUpload} />
          </Form.Group>

        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
            <button type="submit" className='bouttoncancel'>
              Cancelar
            </button>

            <button className='buttonRegistrar' type="submit">
              Registrarse
            </button>
          </div>
    </Form>
    </>
  );
}

export default RegistroUsuarios;
