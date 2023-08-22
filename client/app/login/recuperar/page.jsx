"use client"

import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance from '@/app/axiosConfig';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import RootLayout from './layout';
import Link from 'next/link';



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
            {/* <RootLayout isAuthPage={!isAuthPage}> */}

            <Form onSubmit={handleSubmit} className='blur-background' >
                <h1 className='text-white text-center'>Recuperar Contraseña</h1>
                <Col md>
                    <p style={{ color:'#22096F'}} className='text-center mt-4'><b>¿Olvidaste tu contraseña?<br />No te preocupes, es posible recuperarla</b></p>
                    <Form.Group className="mb-5 mt-5" controlId="exampleForm.ControlInput1">
                        {/* <Form.Label>Correo electrónico</Form.Label> */}
                        <Form.Control type="email" placeholder="Correo electrónico" />
                    </Form.Group>




                </Col>

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '49px' }}>
                    <button className='buttonLogin' type="submit">
                        Recuperar Contraseña
                    </button>
                    <div className='mt-5 mb-3 d-flex align-items-center justify-content-center'>
                        <Link style={{ color: '#22096F' }} href={"/login"}><b>Ya lo recuerdo, Iniciar Sesión</b></Link>
                    </div>

                </div>
            </Form>
            {/* </RootLayout> */}
        </>
    );
}

export default Login;