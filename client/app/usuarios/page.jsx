"use client"
import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import instance, { serverURL } from '../axiosConfig';

function Usuarios() {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsersData, setFilteredUsersData] = useState(null);

  useEffect(() => {
    // Obtener los datos de personal desde el servidor
    const fetchPersonalData = async () => {
      try {
        const response = await instance.get('/personal', {
          params: {
            include: 'usuario',
          },
        });
        setUsersData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de personal:', error);
      }
    };
    fetchPersonalData();
  }, []);

  useEffect(() => {
    // Filtrar los datos de usuarios en función del término de búsqueda
    const filteredUsersData = usersData.filter((user) => {
      return (
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cuilt.includes(searchTerm)
      );
    });

    const modifiedFilteredUsersData = filteredUsersData.map((user) => ({
      ...user,
      imagen: user.imagen ? `http://localhost:3005${user.imagen}` : null,
    }));

    setFilteredUsersData(modifiedFilteredUsersData);
  }, [usersData, searchTerm]);

  console.log('lista Usuarios: \n', usersData);

  const handleUserClick = (id) => {
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
          {filteredUsersData ? (
            filteredUsersData.map((user) => (
              <tr key={user.id_personal}onClick={() => handleUserClick(user.id_personal)} style={{ cursor: 'pointer' }}>
                <td>{user.id_personal}</td>
                <td>
                  {user.imagen ? (
                    <Image src={user.imagen} alt={`Imagen de ${user.nombre}`} style={{ maxWidth: '60px' }} />
                  ) : (
                    <span>No hay imagen</span>
                  )}
                </td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.usuario.nombre}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </Table>
    </div>
  );
}

export default Usuarios;
