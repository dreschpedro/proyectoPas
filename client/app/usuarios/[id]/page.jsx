"use client"

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import instance from '@/app/axiosConfig';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'next/navigation'; // Update import

function PerfilPersonal() {
  const { id } = useParams();

  const [PersonalData, setPersonalData] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    apellido: '',
    nombre: '',
    organizacion: '',
    email: '',
    rol: '',
    cuilt: '',
    telefono: '',
    domicilio: '',
    profesion: '',
  });

  useEffect(() => {
    const obtenerPersonalPorId = async () => {
      try {
        const response = await instance.get(`/personal/${id}`);

        const resData = response.data;
        console.log('Datos del Personal obtenidos:', resData);



        setPersonalData(resData);
        setFormData({
          // datos del usuario
          username: resData.personal.usuario?.username || '',
          email: resData.personal.usuario?.email || '',
          rol: resData.personal.usuario?.rol || '',

          // datos de la organizacion
          organizacion: resData.organizacion?.nombre || '',

          // datos del personal
          apellido: resData.personal.apellido || '',
          nombre: resData.personal.nombre || '',
          cuilt: resData.personal.cuilt || '',
          telefono: resData.personal.telefono || '',
          domicilio: resData.personal.domicilio || '',
          profesion: resData.personal.profesion || '',
        });
      } catch (error) {
        console.error('Error al obtener los datos del Personal:', error.message);
      }

    };

    if (id) {
      obtenerPersonalPorId();
    }
  }, [id]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.post(`/personal/${id}`, formData);
      console.log('Datos del personal actualizados exitosamente:', response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>

      <h1 style={{ marginTop: '20px' }}>Perfil</h1>

      <Row>
        <Col md>
          <Form.Group controlId="formtext">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de Usuario*</Form.Label>
              <Form.Control
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange} // Agrega este atributo
              />

            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formApe">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Apellido*</Form.Label>
              <Form.Control
                name="apellido"
                type="text"
                value={formData.apellido}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombres*</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formOrganizacion">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Organización*</Form.Label>
              <Form.Control
                name="organizacion"
                type="text"
                value={formData.organizacion}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group controlId="formEmail">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rol*</Form.Label>
              <Form.Control
                name="rol"
                type="text"
                value={formData.rol}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formCuilt">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CUIL o CUIT*</Form.Label>
              <Form.Control
                name="cuilt"
                type="text"
                value={formData.cuilt}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formNumber">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Teléfono*</Form.Label>
              <Form.Control
                name="telefono"
                type="text"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formdomicilio">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>domicilio*</Form.Label>
              <Form.Control
                name="domicilio"
                type="text"
                value={formData.domicilio}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="formProfesion">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profesión*</Form.Label>
              <Form.Control
                name="profesion"
                type="text"
                value={formData.profesion}
                onChange={handleChange}
              />
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
            <Button variant="success"
              name=""
              type="submit"
              style={{ width: '200px', fontWeight: 'bold', marginRight: '10px' }
              }>
              Guardar Cambios
            </Button>
            <Button variant="danger" style={{ width: '200px', fontWeight: 'bold' }}>
              Cancelar
            </Button>
          </>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '49px' }}>
        <Button variant="danger"
          name=""
          type="submit"
          style={{ width: '200px', fontWeight: 'bold' }
          }>
          Eliminar cuenta
        </Button>
      </div>
    </Form >
  );
}

export default PerfilPersonal;
