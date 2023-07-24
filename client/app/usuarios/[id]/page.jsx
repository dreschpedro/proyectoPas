"use client"
import React from 'react';
import { Table } from 'react-bootstrap';
import { Form, Button, InputGroup } from 'react-bootstrap';

function RegistroUsuarios() {
  const roles = ['Data-Entry', 'Administrador', 'Consultor'];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
  };

  return (
    <h1>
      user details
    </h1>
  );
}

export default RegistroUsuarios;
