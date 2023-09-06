import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

function registros() {
  return (
    <div className='mt-5'>
        <h1 className='titulo'>Registros</h1>
        <div className='bordesito ' style={{width:'40%', margin:'auto',marginTop:'35px'}}>
        <div className='buttoncitoReg mx-auto custom-link'>
          <Link href={"/admin/registros/organizaciones"} className='custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faBuilding} style={{ color: "#ffffff", marginRight:'15px' }} />
            <b>Organizaciones</b>
          </Link>
        </div>


        <div className='buttoncitoReg mx-auto'>
          <Link href={"/admin/registros/usuarios"} className='custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faUsers} style={{ color: "#ffffff", marginRight:'15px' }} />
            <b>Usuarios</b>
          </Link>
        </div>

        <div className='buttoncitoReg mx-auto'>
          <Link href={"/admin/registros/crudProductos"} className='custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faBoxesPacking} style={{ color: "#ffffff", marginRight:'15px' }} />
            <b>Productos</b>
          </Link>
        </div>

        <div className='buttoncitoReg mx-auto' style={{marginBottom:'15px'}}>
          <Link href={"/admin/registros/crudServicios"} className='custom-link d-flex align-items-center'>
            <FontAwesomeIcon icon={faHandshake} style={{ color: "#ffffff", marginRight:'15px' }} />
            <b>Servicios</b>
          </Link>
        </div>
        </div>
    </div>
  )
}

export default registros