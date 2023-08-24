"use client"
import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import instance, { serverURL } from '@/app/axiosConfig';

function Usuarios() {
  const [PersonalData, setPersonalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPersonalData, setFilteredPersonalData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Obtener los datos de personal desde el servidor solo en el lado del cliente
      const fetchPersonalData = async () => {
        try {
          const response = await instance.get('/personal', {
            params: {
              include: 'usuario',
            },
          });
          setPersonalData(response.data);
        } catch (error) {
          console.error('Error al obtener los datos de personal:', error);
        }
      };
      fetchPersonalData();
    }
  }, []);

  useEffect(() => {
    // Filtrar los datos de usuarios en función del término de búsqueda
    const filteredPersonalData = PersonalData.filter((personal) => {
      const nombre = personal.nombre?.toLowerCase() || ''; // Comprobación de existencia para nombre
      const apellido = personal.apellido?.toLowerCase() || ''; // Comprobación de existencia para apellido
      const usuarioNombre = personal.usuario?.username?.toLowerCase() || ''; // Comprobación de existencia para usuario y nombre
      const cuilt = personal.cuilt || ''; // Comprobación de existencia para cuilt

      return (
        nombre.includes(searchTerm.toLowerCase()) ||
        apellido.includes(searchTerm.toLowerCase()) ||
        usuarioNombre.includes(searchTerm.toLowerCase()) ||
        cuilt.includes(searchTerm.toLowerCase())
      );
    });

    const modifiedFilteredPersonalData = filteredPersonalData.map((personal) => ({
      ...personal,
      imagen: personal.imagen ? `${serverURL}${personal.imagen}` : null,
    }));

    setFilteredPersonalData(modifiedFilteredPersonalData);
  }, [PersonalData, searchTerm]);

  console.log('lista Usuarios: \n', PersonalData);

  const handlepersonalClick = (id) => {
    // Redireccionar a la página de detalle del usuario con el ID correspondiente
    window.location.href = `/usuarios/${id}`;
  };

  return (
    <div>
      <h1 className='titulo'>Usuarios</h1>
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

          <div className="ml-auto"  style={{ display: 'flex', marginLeft: 'auto' }}>
            <Link href="/admin/usuarios/usuarioCreate">
              <button className="buttonRegistrar" style={{ marginLeft: '3rem' }}>
                Crear Usuario
              </button>
            </Link>
          </div>
        </Form>
      </div>

      <Table className='mt-5' striped bordered hover>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#101488', color: '#ffffff', borderTopLeftRadius: '5px' }}>#</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Imagen</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Nombre</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Apellido</th>
            <th style={{ borderTopRightRadius: '5px', backgroundColor: '#101488', color: '#ffffff' }}>Nombre de Usuario</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersonalData ? (
            filteredPersonalData.map((personal) => (
              <tr
                key={personal.id_personal}
                onClick={() => handlepersonalClick(personal.id_personal)}
                style={{ cursor: 'pointer' }}
              >
                <td>{personal.id_personal}</td>
                <td>
                  {personal.imagen ? (
                    <Image src={personal.imagen} alt={`Imagen de ${personal.nombre}`} style={{ maxWidth: '60px' }} />
                  ) : (
                    <span>No hay imagen</span>
                  )}
                </td>
                <td>{personal.nombre}</td>
                <td>{personal.apellido}</td>
                <td>{personal.usuario?.username}</td> {/* Ajustar esta línea */}
              </tr>
            ))
          ) : null}
        </tbody>


      </Table>
    </div>
  );
}

export default Usuarios;
