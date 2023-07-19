"use client"
import React from 'react';
import Table from 'react-bootstrap/Table';
import { Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';

function Usuarios() {
  return (
    <div>
      <h1>Usuarios👤</h1>

      <Form className="d-flex mb-3">
        <FormControl type="text" placeholder="Buscar" className="mr-2" />
        <Button variant="primary" className="mx-1">Buscar</Button>
        <Link href="/usuarios/usuarioCreate">
          <Button variant="success"  className="ml-4">
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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Usuarios;
