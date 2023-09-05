import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import Row from 'react-bootstrap';
import Col from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

// ...




const Sidebar = () => {
  return (
    <div className="sidebar mt-5 pt-5  fixed-start h-100 " style={{ backgroundColor: '#101488', width:'230px'}}>
      <Nav className='d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: '#101488' }}>


        <div className='buttoncito'>
          <Link href={"/admin/consultas"} className='custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faComment} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Consultas</b>
          </Link>
        </div>


        <div className='buttoncito'>
          <Link href={"/admin/estadisticas"} className='custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faChartLine} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Estadísticas</b>
          </Link>
        </div>



        <div className='buttoncito custom-link'>
          <Link href={"/admin/organizaciones"} className='custom-link d-flex  align-items-center'>
            <FontAwesomeIcon icon={faBuilding} style={{ color: "#ffffff", marginRight:'15px' }} />
            <b>Organizaciones</b>
          </Link>
        </div>

        <div className='buttoncito'>
          <Link href={"/admin/servicios"} className='custom-link d-flex  align-items-center'>
            <FontAwesomeIcon icon={faExchangeAlt} style={{ color: "#ffffff" , marginRight:'15px'}} />
            <b>Productos</b>
          </Link>
        </div>

        <div className='buttoncito'>
          <Link href={"/admin/usuarios"} className='custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faUsers} style={{ color: "#ffffff", marginRight:'15px' }} />
            <b>Usuarios</b>
          </Link>
        </div>


      </Nav>
    </div>
  );
};

export default Sidebar;
