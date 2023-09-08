"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import formDesplegables from '@/components/formDesplegables';
import formCliente from '@/components/formCliente';


const RegistroServiciosRealizados = () => {

  const [isFormValid, setIsFormValid] = useState(false);
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const [organizaciones, setOrganizaciones] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [organizacionServicios, setOrganizacionServicios] = useState([]);
  const [organizacionTieneServicios, setOrganizacionTieneServicios] = useState(true);




  return (
    <>
      <Row>
        <Col>
          <div className='d-flex flex-nowrap justify-content-between tablet-width text-nowrap '>
            <h1 className='titulo text-nowrap'>Registrar Servicio</h1>
            <div style={{ marginTop: '5.5rem' }}>
              <Link href="/admin/asistencias/historial">
                <button className='bouttoncancel' >
                  Historial
                </button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      <formDesplegables />
      <formCliente />


    </>
  );
};

export default RegistroServiciosRealizados;