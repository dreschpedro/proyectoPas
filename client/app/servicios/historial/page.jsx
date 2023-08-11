"use client"
import React, { useState } from 'react';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';

const HistorialServicios = () => {
  // State para manejar los filtros de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(null);

  // Datos de ejemplo para el historial de servicios
  const historialServicios = [
    {
      nombreServicio: 'Servicio 1',
      fecha: '2023-07-15',
      hora: '15:30',
      ubicacion: 'Ciudad Autónoma de Buenos Aires, Argentina',
      institucion: 'Institución 1',
      usuarioRegistro: 'Usuario 1',
      beneficiario: 'Juan Pérez',
      dni: '12345678',
      cantidadRealizaciones: 3,
    },
    {
      nombreServicio: 'Servicio 2',
      fecha: '2023-07-16',
      hora: '10:00',
      ubicacion: 'Santiago, Chile',
      institucion: 'Institución 2',
      usuarioRegistro: 'Usuario 2',
      beneficiario: 'María Gómez',
      dni: '87654321',
      cantidadRealizaciones: 1,
    },
    {
      nombreServicio: 'Servicio 3',
      fecha: '2023-07-17',
      hora: '14:45',
      ubicacion: 'Lima, Perú',
      institucion: 'Institución 3',
      usuarioRegistro: 'Usuario 3',
      beneficiario: 'Carlos Ramírez',
      dni: '78901234',
      cantidadRealizaciones: 2,
    },
    // Agrega más datos de ejemplo aquí
  ];

  // Función para realizar la búsqueda asistida
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filtrar los datos de ejemplo en función del término de búsqueda
    const filteredData = historialServicios.filter((servicio) => {
      return (
        servicio.nombreServicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.fecha.includes(searchTerm) ||
        servicio.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.institucion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.usuarioRegistro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.beneficiario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.dni.includes(searchTerm)
      );
    });

    setFilteredData(filteredData);
  };

  // Función para abrir Google Maps con la ubicación
  const handleOpenGoogleMaps = (ubicacion) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(ubicacion)}`, '_blank');
  };

  return (
    <>
      <h1 style={{ marginTop: '20px' }}>Historial de Servicios Realizados</h1>
      <br />

      {/* Filtros de búsqueda asistida */}
      <Form.Group controlId="formSearch">
        <p><b>Buscador</b></p>
        <InputGroup className="mb-3">

          {/* <Form.Label>
            Buscador
          </Form.Label> */}

          {/* <InputGroup.Text id="inputGroup-sizing-default">
            Buscar
          </InputGroup.Text> */}
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar por servicio, fecha, ubicación, institución, usuario, beneficiario o DNI"
          />
        </InputGroup>
      </Form.Group>

      {/* Tabla para mostrar el historial de servicios */}
      <Table striped bordered hover responsive style={{ borderRadius: '1  5px' }}>
        <thead  >
          <tr>
            <th style={{ backgroundColor: '#101488', color: '#ffffff',borderTopLeftRadius: '5px' }}>Nombre del Servicio</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Fecha</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Hora</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }} onClick={() => handleOpenGoogleMaps('Ciudad Autónoma de Buenos Aires, Argentina')}>Ubicación</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Institución</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Usuario Registro</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Nombre Beneficiario</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>DNI</th>
            <th style={{borderTopRightRadius: '5px', backgroundColor: '#101488', color: '#ffffff' }}>Cantidad de Realizaciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData ? (
            filteredData.map((servicio, index) => (
              <tr key={index}>
                <td>{servicio.nombreServicio}</td>
                <td>{servicio.fecha}</td>
                <td>{servicio.hora}</td>
                <td onClick={() => handleOpenGoogleMaps(servicio.ubicacion)} style={{ cursor: 'pointer' }}>
                  {servicio.ubicacion}
                </td>
                <td>{servicio.institucion}</td>
                <td>{servicio.usuarioRegistro}</td>
                <td>{servicio.beneficiario}</td>
                <td>{servicio.dni}</td>
                <td >{servicio.cantidadRealizaciones}</td>
              </tr>
            ))
          ) : (
            // Mostrar datos de ejemplo si no hay datos filtrados
            historialServicios.map((servicio, index) => (
              <tr key={index}>
                <td>{servicio.nombreServicio}</td>
                <td>{servicio.fecha}</td>
                <td>{servicio.hora}</td>
                <td onClick={() => handleOpenGoogleMaps(servicio.ubicacion)} style={{ cursor: 'pointer' }}>
                  {servicio.ubicacion}
                </td>
                <td>{servicio.institucion}</td>
                <td>{servicio.usuarioRegistro}</td>
                <td>{servicio.beneficiario}</td>
                <td>{servicio.dni}</td>
                <td>{servicio.cantidadRealizaciones}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default HistorialServicios;
