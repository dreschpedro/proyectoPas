import React from 'react';


function Button({ children, onClick }) {
  return (
    <button
      style={{ marginLeft: '0.5rem', borderRadius: '5px' }}
      className="buscarbutton"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
