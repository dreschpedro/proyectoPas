//front
"use client";
import React, { useState, useEffect } from 'react';
import { FormControl, Modal, Form, Table, Button, InputGroup } from 'react-bootstrap';
import dynamic from 'next/dynamic'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import instance, { serverURL } from '@/app/axiosConfig';
// import AlertaModal from '@/components/modales/alertaModal';
const AlertaModal = dynamic(() => import('@/components/modales/alertaModal'), { ssr: false })
import crearOrganizacion from '@/components/modales/crearOrganizacion';
import { GET } from '@/app/api/organizaciones/route'

const ListaOrganizaciones = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [listaOrganizaciones, setListaOrganizaciones] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    imagen: '',
    telefono: '',
    direccion: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizaciones = await GET();
        console.log(`organizaciones: `, organizaciones);

        if (Array.isArray(organizaciones)) {
          setListaOrganizaciones(organizaciones);
        } else {
          console.error('La respuesta de GET no es un array:', organizaciones);
        }
      } catch (error) {
        console.error('Error al obtener la lista de Organizaciones:', error);
      }
    };

    fetchData();
  }, []);


  // Filtrar los datos cuando el término de búsqueda cambie
  useEffect(() => {
    if (searchTerm) {
      const filteredData = listaOrganizaciones.filter((organizacion) => {
        return (
          organizacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          organizacion.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          organizacion.telefono.includes(searchTerm) ||
          organizacion.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filteredData);
    } else {
      // Si no hay término de búsqueda, mostrar todos los datos
      setFilteredData(listaOrganizaciones);
    }
  }, [searchTerm, listaOrganizaciones]);

  const handleShowModal = (Organ) => {
    if (Organ) {
      setFormData(Organ);
    } else {
      setFormData({
        id: '',
        name: '',
        description: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('direccion', formData.direccion);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('descripcion', formData.descripcion);

      if (formData.imagen instanceof File) {
        formDataToSend.append('imagen', formData.imagen);
      }

      console.log('Datos enviados al backend:', formDataToSend);

      const response = await instance.post('/organizaciones/registrar', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Verificar si la respuesta es exitosa
      if (response.status === 200) {
        // Mostrar el modal de éxito
        setShowSuccessAlert(true);

        // Establecer un temporizador para ocultar el modal después de 3 segundos
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
      } else {
        // Mostrar el modal de error con el mensaje del servidor
        const responseData = await response.json();
        alert(responseData.error); // Puedes personalizar el mensaje de error como desees
        setShowErrorAlert(true);

        // Establecer un temporizador para ocultar el modal de error después de 3 segundos
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error al guardar la organización:', error);
      // Mostrar el modal de error genérico en caso de error
      setShowErrorAlert(true);

      // Establecer un temporizador para ocultar el modal de error después de 3 segundos
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
    }
  };

  console.log('listaOrganizaciones: \n', listaOrganizaciones);

  const handleUserClick = (id) => {
    // Redireccionar a la página de detalle del usuario con el ID correspondiente
    window.location.href = `/admin/organizaciones/${id}`;
  };

  return (

    <div>
      <h1 className='titulo'>Lista de Organizaciones</h1>

      <div >
        <Form className="mt-5 mb-5 d-flex mb-3 align-items-center">
          <FormControl
            type="text"
            placeholder="Buscar"
            className="mr-2 shadow border border-secondary rounded rounded-1.1 shadow"
            style={{ maxWidth: '35rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="ml-auto" style={{ display: 'flex', marginLeft: 'auto' }}>
            <Button style={{
              whiteSpace: 'nowrap', backgroundColor: '#22096f', marginLeft: '3rem', fontStyle: 'bold',
              border: 'none',
              height: '2.5rem',
              borderRadius: '10px',
              color: '#ffffff',
              borderColor: '#22096F',
              width: '170px',
              font: 'bold',
              transition: 'background-color 0.3s ease',
              whiteSpace: 'nowrap',
            }} className="buttonRegistrar" onClick={() => handleShowModal({})}>Crear Organización</Button>
          </div>
        </Form>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#101488', color: '#ffffff', borderTopLeftRadius: '5px' }} >ID</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >Nombre</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >Logo</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >Dirección</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >telefono</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }} >Email</th>
            <th style={{ borderTopRightRadius: '5px', backgroundColor: '#101488', color: '#ffffff' }} >Descripción</th>
          </tr>
        </thead>
        <tbody>
          {filteredData ? (
            filteredData.map((organizacion) => (
              <tr key={organizacion.id_organizacion}
                onClick={() => handleUserClick(organizacion.id_organizacion)}
                style={{ cursor: 'pointer' }}>
                <td>{organizacion.id_organizacion}</td>
                <td>{organizacion.nombre}</td>
                <td>
                  {/* Usa la URL base junto con la ruta relativa almacenada en organizacion.imagen */}
                  {organizacion.imagen && (
                    <img src={`${serverURL}${organizacion.imagen}`} alt={organizacion.nombre} style={{ maxWidth: '60px' }} />
                  )}
                </td>
                <td>
                  <Link
                    href={`https://www.google.com/maps/search/${encodeURIComponent(organizacion.direccion)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {organizacion.direccion}
                  </Link>
                </td>
                <td>{organizacion.telefono}</td>
                <td>{organizacion.email}</td>
                <td>{organizacion.descripcion}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </Table>


      <AlertaModal
        titulo={'todo correcto'}
        estado={'correcto'}
        mensaje={'Se ha registrado correctamente'}
      />

    </div>
  );
};

export default ListaOrganizaciones;