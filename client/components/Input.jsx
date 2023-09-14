import React from 'react';
import { Form, FormSelect } from 'react-bootstrap';
import Button from './Button'; // Importa el componente Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Función para restringir caracteres según el tipo de entrada
export const handleInputChange = (e, type, name, onChange) => {
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

// Componente reutilizable para agrupar elementos del formulario
export function Grupo({ children }) {
  return <>
    {children}
  </>;
}

// Componente de entrada de texto con validación de caracteres y botón
export function Input({
  className = 'border border-secondary rounded rounded-1.1 shadow mt-5',
  name,
  type = 'text',
  value,
  isComposed,
  required,
  onChange,
  placeholder,
  disabled,
}) {
  const inputComponent = (
    <Form.Control
      className={className}
      type={type}
      name={name}
      value={value}
      required={required}
      onChange={(e) => handleInputChange(e, type, name, onChange)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );

  return isComposed ? (
    <Grupo>
      <div className="input-group">
        {inputComponent}
        <Button
          style={{ marginLeft: '0.5rem', marginTop: '80px', borderRadius: '5px' }}
          className="buscarbutton"
        >
          <FontAwesomeIcon icon={faSearch} style={{ color: "#FFFF" }} />
        </Button>
      </div>
    </Grupo>
  ) : (
    inputComponent
  );
}

// Componente de selección desplegable (select)
export function Select({
  name,
  value,
  required,
  onChange,
  children, // Un array de objetos que contiene las opciones
  isComposed, // Prop para decidir si es un campo compuesto o no

}) {
  const selectComponent = (
    <FormSelect
      className='border border-secondary rounded rounded-1.1 shadow mt-5 mt-3'
      as='select'
      name={name}
      value={value}
      required={required}
      onChange={onChange}
    >
      {children}
    </FormSelect>
  );

  return isComposed ? <Grupo>{selectComponent}</Grupo> : selectComponent;
}

