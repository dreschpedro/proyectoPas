import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import Row from 'react-bootstrap';
import Col from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="sidebar mt-5 pt-5  fixed-start h-100 " style={{ backgroundColor: '#101488' }}>
      <Nav className='d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: '#101488' }}>


      <div className='buttoncito'>
        <Link href={"/admin/consultas"} className='custom-link'>
         <b>Consultas</b> 
        </Link>
        </div>



      <div className='buttoncito'>
        <Link href={"/admin/estadisticas"} className='custom-link'>
         <b>Estadísticas</b> 
        </Link>
        </div>
        


        <div className='buttoncito custom-link'>
          <Link href={"/admin/organizaciones"} className='custom-link'>
          <b>Organizaciones</b> 
          </Link>
        </div>

        <div className='buttoncito'>
          <Link href={"/admin/servicios"} className='custom-link'>
          <b>Servicios</b> 
          </Link>
        </div>

        <div className='buttoncito'>
        <Link href={"/admin/usuarios"} className='custom-link'>
        <b>Usuarios</b> 
        </Link>
        </div>


      </Nav>
    </div>
  );
};

export default Sidebar;
