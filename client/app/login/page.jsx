"use client"

import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance from '@/app/axiosConfig';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RootLayout from '../layout';



const isAuthPage = true;
function Login({ isAuthPage }) {
  const roles = ['Data-Entry', 'Administrador', 'Consultor'];

  // State para almacenar las Login obtenidas del backend
  const [Login, setLogin] = useState([]);
  // State para almacenar el login seleccionado
  const [selectedLogin, setSelectedLogin] = useState('');

  useEffect(() => {
  
    instance.get('/') 
      .then((response) => {
        console.log('Respuesta del backend:', response.data);
        setLogin(response.data);
      })
      .catch((error) => console.error('Error al obtener las Login:', error));
  }, []);


  const handleImageUpload = (event) => {
    // Lógica para manejar la carga de la imagen
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario y crear el usuario en el backend
    const formData = new FormData(event.target);
    formData.append('Login', selectedLogin);
    // Luego envías los datos del formulario al backend para registrar el usuario utilizando Axios
    axios.post('/usuario/login', formData) // Ruta correcta para registrar el usuario en el backend
      .then((response) => {
        // Aquí puedes manejar la respuesta del backend si es necesario
        console.log('Login exitoso:', response.data);
      })
      .catch((error) => console.error('Error al registrar el usuario:', error));
  };

  return (
    <>
    <RootLayout isAuthPage={!isAuthPage}>
      {!isAuthPage && <h1 className='titulo'>Crear cuenta</h1>}
      <Form onSubmit={handleSubmit} className='bordesito' >
        <Col md>

          <Form.Group controlId="formtext">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de Usuario*</Form.Label>
              <Form.Control 
              type="text" 
              name='username'
              placeholder="" />
            </Form.Group>
          </Form.Group>


          <Form.Group controlId="formPassword">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contraseña*</Form.Label>
              <Form.Control 
              type="password" 
              name='password'
              placeholder="" />
            </Form.Group>
          </Form.Group>

        </Col>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
          <button type="submit" className='bouttoncancel'>
            Cancelar
          </button>

          <button className='buttonRegistrar' type="submit">
            Inisiar Sesión
          </button>
        </div>
      </Form>
      </RootLayout>
    </>
  );
}

export default Login;