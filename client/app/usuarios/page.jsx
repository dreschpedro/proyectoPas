"use client"
import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import instance, { serverURL } from '../axiosConfig';

function Usuarios() {
  const [PersonalData, setPersonalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPersonalData, setFilteredPersonalData] = useState(null);

  useEffect(() => {
    // Obtener los datos de personal desde el servidor
    const fetchPersonalData = async () => {
      try {
        const response = await instance.get('/personal', {
          params: {
            include: 'usuario',
          },
        });
        setPersonalData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de personal:', error);
      }
    };
    fetchPersonalData();
  }, []);

  useEffect(() => {
    // Filtrar los datos de usuarios en función del término de búsqueda
    const filteredPersonalData = PersonalData.filter((personal) => {
      const nombre = personal.nombre?.toLowerCase() || ''; // Comprobación de existencia para nombre
      const apellido = personal.apellido?.toLowerCase() || ''; // Comprobación de existencia para apellido
      const usuarioNombre = personal.usuario?.username?.toLowerCase() || ''; // Comprobación de existencia para usuario y nombre
      const cuilt = personal.cuilt || ''; // Comprobación de existencia para cuilt

      return (
        nombre.includes(searchTerm.toLowerCase()) ||
        apellido.includes(searchTerm.toLowerCase()) ||
        usuarioNombre.includes(searchTerm.toLowerCase()) ||
        cuilt.includes(searchTerm.toLowerCase())
      );
    });

    const modifiedFilteredPersonalData = filteredPersonalData.map((personal) => ({
      ...personal,
      imagen: personal.imagen ? `${serverURL}${personal.imagen}` : null,
    }));

    setFilteredPersonalData(modifiedFilteredPersonalData);
  }, [PersonalData, searchTerm]);

  console.log('lista Usuarios: \n', PersonalData);

  const handlepersonalClick = (id) => {
    // Redireccionar a la página de detalle del usuario con el ID correspondiente
    window.location.href = `/usuarios/${id}`;
  };

  return (
    <div>
      <h1 className='mt-3'>Usuarios👤</h1>

      <Form className="d-flex mb-3">
        <FormControl
          type="text"
          placeholder="Buscar"
          className="mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link href="usuarios/usuarioCreate">
          <Button variant="success" className="text-nowrap" style={{ marginLeft: '15px' }}>
            Crear Usuario
          </Button>
        </Link>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Nombre de Usuario</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersonalData ? (
            filteredPersonalData.map((personal) => (
              <tr key={personal.id_personal} onClick={() => handlepersonalClick(personal.id_personal)} style={{ cursor: 'pointer' }}>
                <td>{personal.id_personal}</td>
                <td>
                  {personal.imagen ? (
                    <Image src={personal.imagen} alt={`Imagen de ${personal.nombre}`} style={{ maxWidth: '60px' }} />
                  ) : (
                    <span>No hay imagen</span>
                  )}
                </td>
                <td>{personal.nombre}</td>
                <td>{personal.apellido}</td>
                <td>{personal.usuario?.username}</td> {/* Ajustar esta línea */}
              </tr>
            ))
          ) : null}
        </tbody>


      </Table>
    </div>
  );
}

export default Usuarios;
