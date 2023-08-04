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
  const [Organizaciones, setOrganizaciones] = useState([]);
  const [selectedOrganizacion, setSelectedOrganizacion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrganizaciones, setFilteredOrganizaciones] = useState([]);

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

  const handleImageUpload = (event) => {
    // Lógica para manejar la carga de la imagen
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario y crear el usuario en el backend
    const formData = new FormData(event.target);
    formData.append('organizacion', selectedOrganizacion);
    // Luego envías los datos del formulario al backend para registrar el usuario utilizando Axios
    axios.post('/usuarios/registrar', formData) // Ruta correcta para registrar el usuario en el backend
      .then((response) => {
        // Aquí puedes manejar la respuesta del backend si es necesario
        console.log('Usuario registrado exitosamente:', response.data);
      })
      .catch((error) => console.error('Error al registrar el usuario:', error));
  };

  return (

    <Form onSubmit={handleSubmit} >

      <h1 style={{ marginTop: '20px' }}>Crear cuenta</h1>
      <Row>
        <Col md>

          <Form.Group controlId="formtext">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de Usuario*</Form.Label>
              <Form.Control
                type="text"
                name=""
                // value={formData}
                required
                placeholder="" />
            </Form.Group>
          </Form.Group>


          <Form.Group controlId="formPassword">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contraseña*</Form.Label>
              <Form.Control
                type="password"
                name=""
                // value={formData}
                required
                placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formPassword2">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirmar Contraseña*</Form.Label>
              <Form.Control
                type="password"
                name=""
                // value={formData}
                required
                placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formOrganizacion">
            <Form.Label>Organización*</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
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
                  // title="Seleccionar"
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
                name=""
                // value={formData}
                required
                placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formRol">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rol*</Form.Label>
              <DropdownButton
                title={selectedRol || 'Seleccionar Rol'}
                variant="outline-primary"
                onSelect={(eventKey) => setSelectedRol(eventKey)}>
                {roles.map((rol) => (
                  <Dropdown.Item key={rol} eventKey={rol}>
                    {rol}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>
          </Form.Group>

        </Col>


        <Col md>
          <Form.Group controlId="formCuilt">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CUIL o CUIT*</Form.Label>
              <Form.Control
                type="text"
                name=""
                // value={formData}
                required
                placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre*</Form.Label>
              <Form.Control
                type="text"
                name=""
                // value={formData}
                required
                placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formApe">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellido*</Form.Label>
              <Form.Control
                type="text"
                name=""
                // value={formData}
                required
                placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formNumber">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Teléfono*</Form.Label>
              <Form.Control
                type="text"
                name=""
                // value={formData}
                required
                placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formDomicilio">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Domicilio*</Form.Label>
              <Form.Control
                type="text"
                name=""
                // value={formData}
                required
                placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formProfesion">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profesión*</Form.Label>
              <Form.Control
                type="text"
                name=""
                // value={formData}
                required
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
              name=""
              // value={formData}
              required
              onChange={handleImageUpload} />
          </Form.Group>

        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '49px' }}>
        <Button variant="primary"
          type="submit"
          name=""
          // value={formData}
          style={{ width: '200px', fontWeight: 'bold' }}>
          Registrarse
        </Button>
      </div>
    </Form>

  );
}

export default RegistroUsuarios;
