//front
"use client";
import React, { useState, useEffect } from 'react';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import Link from 'next/link';
import instance, { serverURL } from '../axiosConfig.js'; // Corregimos el nombre de la importación

const ListaOrganizaciones = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [listaOrganizaciones, setListaOrganizaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/organizaciones');
        setListaOrganizaciones(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de Organizaciones:', error);
      }
    };

    fetchData();
  }, []);

  // Filtrar los datos cuando el término de búsqueda cambie
  useEffect(() => {
    if (searchTerm) {
      const filteredData = listaOrganizaciones.filter((organizacion) => {
        return (
          organizacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          organizacion.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          organizacion.telefono.includes(searchTerm) ||
          organizacion.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filteredData);
    } else {
      // Si no hay término de búsqueda, mostrar todos los datos
      setFilteredData(listaOrganizaciones);
    }
  }, [searchTerm, listaOrganizaciones]);

  console.log('listaOrganizaciones: \n', listaOrganizaciones);

  const handleUserClick = (id) => {
    // Redireccionar a la página de detalle del usuario con el ID correspondiente
    window.location.href = `/organizaciones/${id}`;
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Lista de Organizaciones</h1>
      <br />

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Form.Group controlId="formSearch">
          <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default">
              Búscar
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, dirección, telefono o email"
            />
          </InputGroup>
        </Form.Group>
        <Link href="/organizaciones/organizacionCreate">
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
            <th>Logo</th>
            <th>Dirección</th>
            <th>telefono</th>
            <th>Email</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {filteredData ? (
            filteredData.map((organizacion) => (
              <tr key={organizacion.id_organizacion}
                onClick={() => handleUserClick(organizacion.id_organizacion)}
                style={{ cursor: 'pointer' }}>
                <td>{organizacion.id_organizacion}</td>
                <td>{organizacion.nombre}</td>
                <td>
                  {/* Usa la URL base junto con la ruta relativa almacenada en organizacion.imagen */}
                  {organizacion.imagen && (
                    <img src={`${serverURL}${organizacion.imagen}`} alt={organizacion.nombre} style={{ maxWidth: '60px' }} />
                  )}
                </td>
                <td>
                  <Link
                    href={`https://www.google.com/maps/search/${encodeURIComponent(organizacion.direccion)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {organizacion.direccion}
                  </Link>
                </td>
                <td>{organizacion.telefono}</td>
                <td>{organizacion.email}</td>
                <td>{organizacion.descripcion}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </Table>
    </>
  );
};

export default ListaOrganizaciones;
