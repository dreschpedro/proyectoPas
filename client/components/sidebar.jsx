import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import Row from 'react-bootstrap';
import Col from 'react-bootstrap';

// const buttonStyle = {
//   backgroundColor: '#22096F',
//   marginTop: '15px',
//   color: '#FFFFFF',
//   widht: '20px',
// }

const Sidebar = () => {
  return (
    <div className="sidebar mt-5 pt-5  fixed-start h-100 " style={{backgroundColor: '#101488'}}>
      <Nav className='d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: '#101488'}}>
                  
                  <Link href={"/estadisticas"} style={{marginTop: '15px'}} className='custom-link'>
                    <div className='buttoncito' >Estadísticas</div>
                  </Link>
                  <div className='buttoncito custom-link'>
                  <Link href={"/instituciones"} className='custom-link'>
                    Instituciones
                  </Link>
                  </div>
                  <div className='buttoncito'>
                  <Link href={"/servicios"} className='custom-link'>
                    Servicios
                  </Link>
                  </div>
                  <Link href={"/usuarios"} className='custom-link'>
                    <div className='buttoncito'>Usuarios</div>
                  </Link>
                </Nav>
    </div>
  );
};

export default Sidebar;
