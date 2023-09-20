// Imagen.jsx
import React, { useState } from 'react';
import { Input } from '../Input';

function Imagen() {
  const [selectedFile, setSelectedFile] = useState((""));

  const handleInputChange = (e) => {
    const file = e.target.files; 
    setSelectedFile(file);
  };

  return (
    <Input
      name={'imagen'}
      type={'file'}
      value={selectedFile} 
      required={''}
      onChange={handleInputChange}
    />
  );
}

export default Imagen;
