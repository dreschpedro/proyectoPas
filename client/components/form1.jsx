"use client"
import React, { useState, useEffect } from 'react';
import { Form, FormSelect } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import instance, { serverURL } from '@/app/axiosConfig';




// useEffect(() => {
//     const fetchOrganizaciones = async () => {
//       try {
//         const response = await instance.get('/organizaciones');
//         setOrganizaciones(response.data);
//         // console.log('Organizaciones:', response.data); // Add this console.log
//       } catch (error) {
//         console.error('Error al obtener las organizaciones:', error);
//       }
//     };

//     const fetchServicios = async () => {
//       try {
//         const response = await instance.get('/servicios/activo');
//         setServicios(response.data);
//         // console.log('Servicios:', response.data); // Add this console.log
//       } catch (error) {
//         console.error('Error al obtener los servicios:', error);
//       }
//     };

//     fetchOrganizaciones();
//     fetchServicios();
//   }, []);

//   const handleSubmit2 = (e) => {
//     e.preventDefault();
//     const { organizacion, productos, servicios } = formData2;
//     console.log('Valores del segundo formulario:', organizacion, productos, servicios);
//   };

//   const fetchServiciosPorOrganizacion = async (organizacionId) => {
//     try {
//       const response = await instance.get(`/servicios/organizacion/${organizacionId}`);
//       const servicios = response.data;
//       setOrganizacionServicios(servicios);
//       setOrganizacionTieneServicios(servicios.length > 0);
//     } catch (error) {
//       console.error('Error al obtener los servicios:', error);
//     }
//   };

//   const handleOrganizacionChange = async (organizacionId) => {
//     setFormData((prevServiceInfo) => ({
//       ...prevServiceInfo,
//       id_organizacion: organizacionId,
//       servicio: '', // Reset the selected service when the organization changes
//     }));

//     // Llamada a la función para obtener servicios por organización
//     fetchServiciosPorOrganizacion(organizacionId);

//     // Buscar la organización seleccionada
//     const selectedOrganizacion = organizaciones.find(org => org.id_organizacion === organizacionId);

//     if (selectedOrganizacion) {
//       console.log('Selected Organizacion ID:', selectedOrganizacion.id_organizacion);
//     } else {
//       console.log('Selected Organizacion: No se encontró la organización');
//     }
//   };



function form1() {
  return (
    <>
    <Form 
    // onSubmit={handleSubmit2}
     className='bordesito tablet-width'>
        {/* inicio componente 1 */}
        <Row>
          <Col>
            {/* Seleccionar Organizacion y Servicio */}
            <Form.Group controlId="formOrganizacion">
              {/* <Form.Label>Organización*</Form.Label> */}
              <FormSelect
                className="mb-5 border border-secondary rounded rounded-1.1 shadow"
                as="select"
                name='organizacion'
                // value={formData.organizacion}
                onChange={(e) => {
                  console.log('Selected Organizacion ID:', e.target.value);
                  setFormData({ ...formData, organizacion: e.target.value });
                  handleOrganizacionChange(e.target.value);
                }}
              >
                <option value="">Seleccionar Organización</option>
                {/* {organizaciones.map((organizacion) => (
                  <option key={organizacion.id_organizacion} value={organizacion.id_organizacion}>
                    {organizacion.nombre}
                  </option>
                ))} */}
              </FormSelect>
            </Form.Group>


            <Form.Group controlId="formServicio" className="d-flex mb-3 align-items-center">
              {/* <Form.Label>Servicio*</Form.Label> */}
              <FormSelect
                className="border border-secondary rounded rounded-1.1 shadow"
                // style={{ width: '40px' }}
                name='servicio'
                as="select"
                // value={formData.servicio}
                // onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
              >
                <option value="">Seleccionar Producto</option>
                {/* {organizacionTieneServicios ? (
                  organizacionServicios.map((servicio) => (
                    <option key={servicio.id_servicio} value={servicio.id_servicio}>
                      {servicio.nombre}
                    </option>
                  ))
                ) : (
                  <option disabled>No tiene productos registrados</option>
                )} */}
              </FormSelect>
              <Form.Control
                className='border border-secondary rounded rounded-1.1 shadow ml-1'
                style={{ marginLeft: '10px', width: '104px' }}
                type="number"
                placeholder="Cantidad"
              />
            </Form.Group>

            <Form.Group controlId="formServicio">
              {/* <Form.Label>Servicio*</Form.Label> */}
              <FormSelect className="mt-5 mt-3 border border-secondary rounded rounded-1.1 shadow"
                name='servicio'
                as="select"
                // value={formData.servicio}
                // onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
              >
                <option value="">Seleccionar Servicio</option>
                {/* {organizacionTieneServicios ? (
                  organizacionServicios.map((servicio) => (
                    <option key={servicio.id_servicio} value={servicio.id_servicio}>
                      {servicio.nombre}
                    </option>
                  ))
                ) : (
                  <option disabled>No tiene servicios registrados</option>
                )} */}
              </FormSelect>

            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button
                className='buttonRegistrar'
                // onClick={(e) => {
                //   createTable(formData2)
                // }}
              >
                Agregar
              </button>
            </div>
          </Col>
        </Row>
      </Form >
      {/* fin comoponente 1 */}
    </>
  )
}

export default form1