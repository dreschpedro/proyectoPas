"use client"

import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance from '@/app/axiosConfig';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'next/navigation'

function PerfilPersonal() {
  const { id } = useParams(); // Obtiene el id del personal desde la URL utilizando 'useParams'

  // Estado para almacenar los datos del personal obtenidos del backend
  const [userData, setUserData] = useState({});
  // Estado para habilitar la edición de campos
  const [editing, setEditing] = useState(false);
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nombres: '',
    organizacion: '',
    email: '',
    rol: '',
    cuil: '',
    telefono: '',
    domicilio: '',
    profesion: '',
  });

  useEffect(() => {
    // Realiza la solicitud GET para obtener los datos del personal por su ID
    const obtenerPersonalPorId = async () => {
      try {
        const response = await instance.get(`/personal/${id}`);
        setUserData(response.data);
        // Llena los campos del formulario con los datos obtenidos del servidor
        setFormData({
          nombre: response.data.nombre || '',
          apellido: response.data.apellido || '',
          nombres: response.data.nombres || '',
          organizacion: response.data.organizacion || '',
          email: response.data.email || '',
          rol: response.data.rol || '',
          cuil: response.data.cuil || '',
          telefono: response.data.telefono || '',
          domicilio: response.data.domicilio || '',
          profesion: response.data.profesion || '',
        });
      } catch (error) {
        console.error('Error al obtener los datos del Personal:', error.message);
      }
    };

    if (id) {
      obtenerPersonalPorId();
    }
  }, [id]);

  const handleImageUpload = (event) => {
    // Lógica para manejar la carga de la imagen
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario y actualizar los datos del usuario en el backend
    try {
      // Realizar la lógica para guardar los cambios en el backend utilizando formData
      // Puedes usar formData.nombre, formData.apellido, etc.
      // Simulamos una respuesta exitosa de la API
      const response = await instance.post(`/personal/${id}`, formData);
      console.log('Datos del personal actualizados exitosamente:', response.data);
      setEditing(false); // Desactivar el modo de edición después de guardar los cambios
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ marginTop: '20px' }}>Perfil</h1>

      <Row>
        <Col md>
          <Form.Group controlId="formtext">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de Usuario*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formApe">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellido*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombres*</Form.Label>
              <Form.Control type="text" placeholder="" />
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
        </Col>
        <Col md>
          <Form.Group controlId="formEmail">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rol*</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formCuilt">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CUIL o CUIT*</Form.Label>
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
        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '49px' }}>
        {!editing ? (
          <Button variant="warning" onClick={() => setEditing(true)} style={{ width: '200px', fontWeight: 'bold' }}>
            Modificar cuenta
          </Button>
        ) : (
          <>
            <Button variant="success" type="submit" style={{ width: '200px', fontWeight: 'bold', marginRight: '10px' }}>
              Guardar Cambios
            </Button>
            <Button variant="danger" style={{ width: '200px', fontWeight: 'bold' }}>
              Cancelar
            </Button>
          </>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '49px' }}>
        <Button variant="danger" type="submit" style={{ width: '200px', fontWeight: 'bold' }}>
          Eliminar cuenta
        </Button>
      </div>
    </Form>
  );
}

export default PerfilPersonal;
