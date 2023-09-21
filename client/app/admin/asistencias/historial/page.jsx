"use client"
import React, { useState } from 'react';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import axios from 'axios';


const HistorialServicios = () => {
  // State para manejar los filtros de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [datos, setDatos] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  // Datos de ejemplo para el historial de servicios
  const historialServicios = [
    {
      nombreServicio: 'Servicio 1',
      fecha: '2023-07-15',
      hora: '15:30',
      ubicacion: 'Ciudad Autónoma de Buenos Aires, Argentina',
      organizacion: 'organizacion 1',
      usuarioRegistro: 'Usuario 1',
      beneficiario: 'Juan Pérez',
      dni: '12345678',
      // cantidadRealizaciones: 3,
    },
    {
      nombreServicio: 'Servicio 1',
      fecha: '2023-07-16',
      hora: '10:00',
      ubicacion: 'Santiago, Chile',
      organizacion: 'organizacion 2',
      usuarioRegistro: 'Usuario 2',
      beneficiario: 'María Gómez',
      dni: '87654321',
      // cantidadRealizaciones: 1,
    },
    {
      nombreServicio: 'Servicio 3',
      fecha: '2023-07-17',
      hora: '14:45',
      ubicacion: 'Lima, Perú',
      organizacion: 'organizacion 3',
      usuarioRegistro: 'Usuario 3',
      beneficiario: 'Carlos Ramírez',
      dni: '78901234',
      // cantidadRealizaciones: 2,
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
        servicio.organizacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
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


const organizacion = ""

  useState(() => {
    axios.get(`${serverURL}/serv_real${organizacion}`) // Cambio de servicios a productos
      .then(response => {
        setDatos(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      })
  }, []);

  const updateData = () => {
    axios.get(`${serverURL}/serv_real${organizacion}`) // Cambio de servicios a productos
      .then(response => {
        setDatos(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };


  return (
    <>
      <h1 className='titulo'>Historial de Servicios</h1>
      <br />

      {/* Filtros de búsqueda asistida */}
      <Form.Group controlId="formSearch" className='mt-5 mb-5 '>
        {/* <p><b>Buscador</b></p> */}
        <InputGroup className="mb-3 shadow border border-secondary rounded rounded-1.1" style={{ maxWidth: '35rem' }}>

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
            placeholder="Buscador"
          />
        </InputGroup>
      </Form.Group>

      {/* Tabla para mostrar el historial de servicios */}
      <Table striped bordered hover responsive style={{ borderRadius: '1  5px' }}>
        <thead  >
          <tr>
            <th style={{ backgroundColor: '#101488', color: '#ffffff',borderTopLeftRadius: '5px' }}>Servicio</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Producto</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Organización</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Fecha</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Hora</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }} onClick={() => handleOpenGoogleMaps('Ciudad Autónoma de Buenos Aires, Argentina')}>Ubicación</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Nombre beneficiado</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>DNI beneficiado</th>
            <th style={{borderTopRightRadius: '5px', backgroundColor: '#101488', color: '#ffffff' }}>Registrado por</th>
          </tr>
        </thead>
        <tbody>
        {datos.map((item) => (
              <tr key={item.id_serv_realizado}>
                <td>{item.servicio}</td>
                <td>{item.fecha}</td>
                <td>{item.cliente}</td>
                <td onClick={() => handleOpenGoogleMaps(item.ubicacion)} style={{ cursor: 'pointer' }}>
                  {item.ubicacion}
                </td>
                {/* <td>{item.organizacion}</td>
                <td>{item.usuarioRegistro}</td>
                <td>{item.beneficiario}</td>
                <td>{item.dni}</td> */}
                {/* <td >{servicio.cantidadRealizaciones}</td> */}
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default HistorialServicios;
