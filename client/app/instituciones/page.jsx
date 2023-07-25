"use client"
import React, { useState, useEffect } from 'react';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import Link from 'next/link';

const ListaInstituciones = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [listaInstituciones, setListaInstituciones] = useState([]);

  useEffect(() => {
    // Simulamos una llamada a la API para obtener la lista de instituciones
    axios.get('/api/instituciones')
      .then((response) => {
        setListaInstituciones(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de instituciones:', error);
      });
  }, []);

  useEffect(() => {
    // Filtrar los datos cuando el término de búsqueda cambie
    if (searchTerm) {
      const filteredData = listaInstituciones.filter((institucion) => {
        return (
          institucion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          institucion.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          institucion.contacto.includes(searchTerm) ||
          institucion.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filteredData);
    } else {
      setFilteredData(null);
    }
  }, [searchTerm, listaInstituciones]);

  // Datos de ejemplo para la lista de instituciones
  const datosEjemplo = [
    {
      id: 1,
      nombre: 'Institución 1',
      imagen: 'ruta_de_la_imagen1.jpg',
      direccion: 'Calle 123, Ciudad Autónoma de Buenos Aires, Argentina',
      contacto: '+54 9 123456789',
      email: 'institucion1@example.com',
      descripcion: 'Esta es la descripción de la Institución 1',
    },
    {
      id: 2,
      nombre: 'Institución 2',
      imagen: 'ruta_de_la_imagen2.jpg',
      direccion: 'Avenida XYZ, Santiago, Chile',
      contacto: '+56 9 987654321',
      email: 'institucion2@example.com',
      descripcion: 'Esta es la descripción de la Institución 2',
    },
    {
      id: 3,
      nombre: 'Institución 3',
      imagen: 'ruta_de_la_imagen3.jpg',
      direccion: 'Av. ABC, Lima, Perú',
      contacto: '+51 9 555555555',
      email: 'institucion3@example.com',
      descripcion: 'Esta es la descripción de la Institución 3',
    },
    {
      id: 4,
      nombre: 'Institución 4',
      imagen: 'ruta_de_la_imagen4.jpg',
      direccion: 'Av. XYZ, Ciudad de México, México',
      contacto: '+52 9 999999999',
      email: 'institucion4@example.com',
      descripcion: 'Esta es la descripción de la Institución 4',
    },
    {
      id: 5,
      nombre: 'Institución 5',
      imagen: 'ruta_de_la_imagen5.jpg',
      direccion: 'Av. 123, Bogotá, Colombia',
      contacto: '+57 9 777777777',
      email: 'institucion5@example.com',
      descripcion: 'Esta es la descripción de la Institución 5',
    },
  ];

  const handleUserClick = (id) => {
    // Redireccionar a la página de detalle del usuario con el ID correspondiente
    window.location.href = `/instituciones/${id}`;
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Lista de Instituciones</h1>
      <br />

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Form.Group controlId="formSearch">
          <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default">
              Búsqueda Asistida
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, dirección, contacto o email"
            />
          </InputGroup>
        </Form.Group>
        <Link href="/instituciones/institucionesCreate">
          <Button variant="success" style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            Crear
          </Button>
        </Link>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Dirección</th>
            <th>Contacto</th>
            <th>Email</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {filteredData ? (
            filteredData.map((institucion) => (
              <tr key={institucion.id} onClick={() => handleUserClick(institucion.id)} style={{ cursor: 'pointer' }}>
                <td>{institucion.id}</td>
                <td>{institucion.nombre}</td>
                <td>
                  {institucion.imagen && (
                    <img src={institucion.imagen} alt={institucion.nombre} style={{ maxWidth: '100px' }} />
                  )}
                </td>
                <td>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(institucion.direccion)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {institucion.direccion}
                  </a>
                </td>
                <td>{institucion.contacto}</td>
                <td>{institucion.email}</td>
                <td>{institucion.descripcion}</td>
              </tr>
            ))
          ) : (
            datosEjemplo.map((institucion) => (
              <tr key={institucion.id} onClick={() => handleUserClick(institucion.id)} style={{ cursor: 'pointer' }}>
                <td>{institucion.id}</td>
                <td>{institucion.nombre}</td>
                <td>
                  {institucion.imagen && (
                    <img src={institucion.imagen} alt={institucion.nombre} style={{ maxWidth: '100px' }} />
                  )}
                </td>
                <td>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(institucion.direccion)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {institucion.direccion}
                  </a>
                </td>
                <td>{institucion.contacto}</td>
                <td>{institucion.email}</td>
                <td>{institucion.descripcion}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ListaInstituciones;
