"use client"
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Form, FormControl, Button, Pagination } from 'react-bootstrap';
import Link from 'next/link';

function Usuarios() {
  // Estado para controlar la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Número de usuarios por página

  // Datos de ejemplo para mostrar en la tabla
  const usersData = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat' },
    { id: 3, firstName: 'Larry', lastName: 'the Bird', username: '@twitter' },
    // ...otros usuarios
  ];

  // Obtener índices de usuarios correspondientes a la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className='mt-3'>Usuarios👤</h1>

      <Form className="d-flex mb-3">
        <FormControl type="text" placeholder="Buscar" className="mr-2" />
        <Button variant="primary" className="mx-1">Buscar</Button>
        <Link href="/usuarios/usuarioCreate">
          <Button variant="success" className="ml-4">
            Crear
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
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>


          
      {/* Paginación */}

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
          disabled={currentPage === Math.ceil(usersData.length / usersPerPage)}
        />
        <Pagination.Last
          onClick={() =>
            paginate(Math.ceil(usersData.length / usersPerPage))
          }
        />
      </Pagination>
      </div>
    </div>
  );
}

export default Usuarios;
