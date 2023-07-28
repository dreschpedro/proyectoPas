"use client"
import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import instance from '../axiosConfig';

function Usuarios() {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsersData, setFilteredUsersData] = useState(null);

  useEffect(() => {
    // Obtener los datos de personal desde el servidor
    const fetchPersonalData = async () => {
      try {
        const response = await instance.get('/personal', {
          // Agregar el parámetro 'include' para incluir los datos de usuario
          params: {
            include: 'usuario', // Asegúrate de que el nombre de la relación sea correcto en tu backend (puede ser 'usuario' o 'usuarios' según la configuración)
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
        user.cuilt.includes(searchTerm)
      );
    });

    setFilteredUsersData(filteredUsersData);
  }, [usersData, searchTerm]);

  const handleUserClick = (id) => {
    // Redireccionar a la página de detalle del usuario con el ID correspondiente
    window.location.href = `/usuarios/${id}`;
  };

  console.log('usersData:', usersData);
  console.log('filteredUsersData:', filteredUsersData);

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
            <th>Nombre</th>
            <th>Apellido</th>
            <th>CUIL/T</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsersData ? (
            filteredUsersData.map((user) => (
              <tr key={user.id_personal}>
                <td>{user.id_personal}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.usuario.nombre}</td>
              </tr>
            ))
          ) : null}
        </tbody>


      </Table>

      {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination>
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil((filteredUsersData || usersData).length / usersPerPage)}
            />
            <Pagination.Last
              onClick={() =>
                paginate(Math.ceil((filteredUsersData || usersData).length / usersPerPage))
              }
            />
          </Pagination>
        </div> */}
    </div>
  );
}

export default Usuarios;
