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
import { faEdit } from '@fortawesome/free-solid-svg-icons';

// ...




const Sidebar = () => {
  return (
    <div className="sidebar mt-5 pt-5 " style={{ backgroundColor: '#101488', width: '230px' }}>
      <Nav className='d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: '#101488' }}>

      <Link href={"/admin/consultas"} className='custom-link d-flex align-items-center'>
        <button className='buttonNav custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faComment} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Consultas</b>
        </button>
        </Link>

        <Link href={"/admin/estadisticas"} className='custom-link d-flex align-items-center'>
        <button className='buttonNav custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faChartLine} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Estadísticas</b>
        </button>
        </Link>

        <Link href={"/admin/asistencias"} className='custom-link d-flex align-items-center'>
        <button className='buttonNav custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faExchangeAlt} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Asistencias</b>
        </button>
        </Link>

        <Link href={"/admin/registros"} className='custom-link d-flex align-items-center'>
        <button className='buttonNav custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faEdit} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Registros</b>
        </button>
        </Link>

        <Link href={"/admin/registros"} className='custom-link d-flex align-items-center'>
        <button className='buttonNav custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faEdit} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Ordenes</b>
        </button>
        </Link>


        {/* <div className='buttoncito'>
          <Link href={"/admin/estadisticas"} className='custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faChartLine} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Estadísticas</b>
          </Link>
        </div>




        <div className='buttoncito'>
          <Link href={"/admin/asistencias"} className='custom-link d-flex  align-items-center'>
            <FontAwesomeIcon icon={faExchangeAlt} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Asistencias</b>
          </Link>
        </div> */}
{/* 
        <div className='buttoncito'>
          <Link href={"/admin/registros"} className='custom-link d-flex  align-items-center'>
            <FontAwesomeIcon icon={faEdit} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Registros</b>
          </Link>
        </div>

        <div className='buttoncito'>
          <Link href={"/admin/registros"} className='custom-link d-flex  align-items-center'>
            <FontAwesomeIcon icon={faEdit} style={{ color: "#ffffff", marginRight: '15px' }} />
            <b>Ordenes</b>
          </Link>
        </div> */}


      </Nav>
    </div>
  );
};

export default Sidebar;
