"use client"

import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import RootLayout from './layout';
import Link from 'next/link';



// const isAuthPage = true;
function Login() {
  // const roles = ['Data-Entry', 'Administrador', 'Consultor'];

  // // State para almacenar las Login obtenidas del backend
  // const [Login, setLogin] = useState([]);
  // // State para almacenar el login seleccionado
  // const [selectedLogin, setSelectedLogin] = useState('');

  // useEffect(() => {

  //   instance.get('/')
  //     .then((response) => {
  //       console.log('Respuesta del backend:', response.data);
  //       setLogin(response.data);
  //     })
  //     .catch((error) => console.error('Error al obtener las Login:', error));
  // }, []);


  // const handleImageUpload = (event) => {
  //   // Lógica para manejar la carga de la imagen
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Aquí puedes agregar la lógica para manejar el envío del formulario y crear el usuario en el backend
  //   const formData = new FormData(event.target);
  //   formData.append('Login', selectedLogin);
  //   // Luego envías los datos del formulario al backend para registrar el usuario utilizando Axios
  //   instance.post('/usuario/login', formData) // Ruta correcta para registrar el usuario en el backend
  //     .then((response) => {
  //       // Aquí puedes manejar la respuesta del backend si es necesario
  //       console.log('Login exitoso:', response.data);
  //     })
  //     .catch((error) => console.error('Error al registrar el usuario:', error));
  // };


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.post('/login', {
        username: formData.username,
        password: formData.password,
      });
      if (response.status === 200) {
        console.log('funciona');
        window.location.href = 'http://localhost:/admin';
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className='blur-background' >
        <h1 className='text-white text-center'>Iniciar Sesion</h1>
        <Col md>
          <Form.Group controlId="formtext" className='mt-5'>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Email*</Form.Label> */}
              <Form.Control
                type="text"
                name='username'
                required
                placeholder="Nombre de Usuario"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>


          <Form.Group controlId="formPassword">
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Contraseña*</Form.Label> */}
              <Form.Control className='shadow shadow-sm'
                type="password"
                name='password'
                required
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>

        </Col>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '49px' }}>
          <button className='buttonLogin' type="submit">
            <Link href={"/admin"}style={{color:'#ffffff'}}>Iniciar Sesión</Link>
          </button>
          <div className='mt-5 mb-3 d-flex align-items-center justify-content-center'>
            <Link style={{ color: '#22096F' }} href={"/login/recuperar"}><b>Recuperar Contraseña</b></Link>
          </div>

        </div>
      </Form>

    </>
  );
}

export default Login;