import React from 'react';
import { Form, FormSelect } from 'react-bootstrap';

// Componente reutilizable para agrupar elementos del formulario
export function Grupo({ children, name, className = 'mt-5' }) {
  return (
    <Form.Group className={className} controlId={`form-${name}`}>
      {children}
    </Form.Group>
  );
}

// Componente de entrada de texto con validación de caracteres
export function Input({
  // Valor por defecto para la clase del componente
  className = 'border border-secondary rounded rounded-1.1 shadow mt-5',
  name,
  // Valor por defecto para el tipo de entrada (text)
  type = 'text',
  value,
  required,
  onChange,
  placeholder,
  // Valor por defecto para el estado de deshabilitado (no deshabilitado)
  disabled,
}) {
  // Función para restringir caracteres según el tipo de entrada
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (type === 'numero') {
      // Solo permitir números eliminando otros caracteres
      const numericValue = inputValue.replace(/[^0-9]/g, '');
      onChange({ target: { name, value: numericValue } });
    } else if (type === 'string') {
      // Permitir letras (incluyendo acentos) y espacios eliminando otros caracteres
      const textValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, '');
      onChange({ target: { name, value: textValue } });
    } else {
      // Para otros tipos, permitir cualquier carácter
      onChange({ target: { name, value: inputValue } });
    }
  };

  return (
    <Grupo name={name}>
      <Form.Control
        className={className}
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Grupo>
  );
}

// Componente de selección desplegable (select)
export function Select({ name, value, required, onChange, mensaje }) {
  return (
    <Grupo name={name}>
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
    </Grupo>
  );
}

export default Select;
