import React, { useState, useEffect } from 'react';
import { Form, FormSelect } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export function Input({ name, type, value, required, onChange, placeholder }) {
  return (
    <Form.Group
      className='mt-5'
      controlId={`form-${name}`}
    >
      <Form.Control
        className='border border-secondary rounded rounded-1.1 shadow mt-5'
        type={type}
        as='input'
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Form.Group>
  )
}

export function Select({ name, value, required, onChange, mensaje }) {
  return (
    <Form.Group
      className='mt-5'
      controlId={`form-${name}`}
    >
      <FormSelect
        className='border border-secondary rounded rounded-1.1 shadow mt-5 mt-3'
        as='select'
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      >
        <option value="">Seleccione {mensaje}</option>
        {/* {localidades.map((localidad) => (
        <option key={localidad.id} value={localidad.id}>
          {localidad.nombre}
        </option>
      ))} */}
      </FormSelect>
    </Form.Group>
  )
}

export default Select
