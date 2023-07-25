"use client"
import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl, Button, InputGroup, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Link from 'next/link';

function Usuarios() {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsersData, setFilteredUsersData] = useState(null);

  useEffect(() => {
    // Simulamos una llamada a la API para obtener los datos de los usuarios
    // Aquí están los datos de ejemplo, pero puedes reemplazarlos con una llamada real a la API
    const ejemploUsuarios = [
      { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
      { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat' },
      { id: 3, firstName: 'Larry', lastName: 'the Bird', username: '@twitter' },
      // Agrega más usuarios de ejemplo aquí
    ];

    setUsersData(ejemploUsuarios);
  }, []);

  useEffect(() => {
    // Filtrar los datos de usuarios en función del término de búsqueda
    const filteredUsersData = usersData.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredUsersData(filteredUsersData);
  }, [usersData, searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsersData
    ? filteredUsersData.slice(indexOfFirstUser, indexOfLastUser)
    : usersData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} onClick={() => handleUserClick(user.id)} style={{ cursor: 'pointer' }}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
      </div>
    </div>
  );
}

export default Usuarios;
