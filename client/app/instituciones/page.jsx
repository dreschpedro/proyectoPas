"use client"
import React, { useState, useEffect } from 'react';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import instance from '../axiosConfig';
import Link from 'next/link';

const ListaInstituciones = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [listaInstituciones, setListaInstituciones] = useState([]);

  useEffect(() => {
    // Obtener la lista de instituciones desde el backend
    instance.get('/institucion')
      .then((response) => {
        console.log('Datos de la API:', response.data); // Verificar los datos obtenidos
        setListaInstituciones(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de instituciones:', error);
      });
  }, []);

  // Agregar el console.log justo aquí
  console.log('listaInstituciones:', listaInstituciones);

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
                  {/* La imagen se muestra si institucion.imagen contiene la URL de la imagen */}
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
          ) : null}
        </tbody>
      </Table>
    </>
  );
};

export default ListaInstituciones;
