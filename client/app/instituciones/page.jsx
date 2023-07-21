"use client"
import React, { useState, useEffect } from 'react';
import { Table, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';

const ListaInstituciones = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [listaInstituciones, setListaInstituciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInstitucion, setSelectedInstitucion] = useState(null);
  const [clave, setClave] = useState('');

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

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredData = listaInstituciones.filter((institucion) => {
      return (
        institucion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institucion.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institucion.contacto.includes(searchTerm) ||
        institucion.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredData(filteredData);
  };

  const handleShowModal = (institucion) => {
    setSelectedInstitucion(institucion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedInstitucion(null);
    setClave('');
    setShowModal(false);
  };

  const handleDeleteInstitucion = () => {
    // Validar la clave antes de eliminar la institución
    if (clave === 'admin123') {
      // Llamada a la API para eliminar la institución
      axios.delete(`/api/instituciones/${selectedInstitucion.id}`)
        .then(() => {
          // Actualizamos la lista de instituciones localmente
          const updatedData = listaInstituciones.filter((institucion) => institucion !== selectedInstitucion);
          setListaInstituciones(updatedData);
          handleCloseModal();
        })
        .catch((error) => {
          console.error('Error al eliminar la institución:', error);
          alert('Error al eliminar la institución. Por favor, inténtalo nuevamente.');
        });
    } else {
      alert('Clave incorrecta. No se puede eliminar la institución.');
    }
  };

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
    // Agrega más datos de ejemplo aquí
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

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Lista de Instituciones</h1>
      <br />

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Form.Group controlId="formSearch">
          <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default">
              Filtro Asistido
            </InputGroup.Text>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={handleSearch}
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData ? (
            filteredData.map((institucion) => (
              <tr key={institucion.id}>
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
                <td>
                  <Link href={`/instituciones/institucionesEdit/${institucion.id}`}>
                    <Button variant="primary">Modificar</Button>
                  </Link>
                  <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => handleShowModal(institucion)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            datosEjemplo.map((institucion) => (
              <tr key={institucion.id}>
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
                <td>
                  <Link href={`/instituciones/institucionesEdit/${institucion.id}`}>
                    <Button variant="primary">Modificar</Button>
                  </Link>
                  <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => handleShowModal(institucion)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Ventana Modal para Eliminar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Institución</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ingrese la clave de administrador para eliminar la institución.</p>
          <Form.Group controlId="formClave">
            <Form.Control
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Clave de administrador"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteInstitucion}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListaInstituciones;
