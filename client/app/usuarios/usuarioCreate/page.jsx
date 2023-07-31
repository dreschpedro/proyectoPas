"use client"

import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance from '@/app/axiosConfig';
import { Container } from 'react-bootstrap';

function RegistroUsuarios() {
  const roles = ['Data-Entry', 'Administrador', 'Consultor'];

  // State para almacenar las instituciones obtenidas del backend
  const [instituciones, setInstituciones] = useState([]);
  // State para almacenar la institución seleccionada
  const [selectedInstitucion, setSelectedInstitucion] = useState('');

  useEffect(() => {
    // Lógica para obtener la lista de instituciones desde el backend utilizando la instancia de axios
    instance.get('/institucion/') // La solicitud se enviará automáticamente a 'http://localhost:3005/api/institucion/'
      .then((response) => {
        console.log('Respuesta del backend:', response.data);
        setInstituciones(response.data);
      })
      .catch((error) => console.error('Error al obtener las instituciones:', error));
  }, []);


  const handleImageUpload = (event) => {
    // Lógica para manejar la carga de la imagen
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario y crear el usuario en el backend
    const formData = new FormData(event.target);
    formData.append('institucion', selectedInstitucion);
    // Luego envías los datos del formulario al backend para registrar el usuario utilizando Axios
    axios.post('/api/usuario/registrar', formData) // Ruta correcta para registrar el usuario en el backend
      .then((response) => {
        // Aquí puedes manejar la respuesta del backend si es necesario
        console.log('Usuario registrado exitosamente:', response.data);
      })
      .catch((error) => console.error('Error al registrar el usuario:', error));
  };

  return (
<>

<Form onSubmit={handleSubmit} >

      <h1 style={{ marginTop: '20px' }}>Crear cuenta</h1>



      <Container className='d-flex flex-wrap'>


        <Container className='col-4'>
          <Form.Group controlId="formtext">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de Usuario*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>


          <Form.Group controlId="formPassword">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contraseña*</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formPassword2">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirmar Contraseña*</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formOrganizacion">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Organización*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email*</Form.Label>
              <Form.Control type="email" placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rol*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>

        </Container>

        <Container className='col-4'>
          <Form.Group controlId="formCuilt">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CUIL o CUIT*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombres y Apellidos*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formNumber">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Teléfono*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formDomicilio">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Domicilio*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="formProfesion">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profesión*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>


          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '49px' }}>
            <Button variant="primary" type="submit" style={{ width: '200px', fontWeight: 'bold' }}>
              Registrarse
            </Button>
          </div>

        </Container>


        <Container className='col-3'>
          <Form.Group controlId="formFile">
            <Form.Label>Subir imagen de perfil</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
          </Form.Group>
        </Container>

      </Container>


    </Form>
    </>
  );
}

export default RegistroUsuarios;
