//front
"use client";
import React, { useState, useEffect } from 'react';
import { FormControl, Modal, Form, Table, Button, InputGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import instance, { serverURL } from '@/app/axiosConfig';
import AlertaModal from '@/components/modales/alertaModal';
// import avisoModal from '@/components/modales/avisoModal';
import crearOrganizacion from '@/components/modales/crearOrganizacion';
// import { GET } from '@/app/api/crudProductos/route'
import CrudTable from '@/components/crudTable';
import axios from 'axios';

const ListaOrganizaciones = () => {
  const [datos, setDatos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [listaOrganizaciones, setListaOrganizaciones] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [formData, setFormData] = useState({
  //   nombre: '',
  //   email: '',
  //   imagen: '',
  //   telefono: '',
  //   direccion: '',
  // });


  // const ruta = `http://localhost:3005/producto`

  useState(() => {

    axios.get(`${serverURL}/producto/activo`)
      .then(response => {
        setDatos(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      })
    /*     async function getUser() {
          try {
            const response = await axios.get('http://localhost:3005/producto/activo');
            const datosProductos = await result.json();
            return(response);
          } catch (error) {
            console.error(error);
          }
        }
      
      getUser();  */


    /* const fetchData = async () => {
      try {
        const organizaciones = await GET(ruta);
        console.log(`productos: `, data);

        if (Array.isArray(organizaciones)) {
          setListaOrganizaciones(organizaciones);
        } else {
          console.error('La respuesta de GET no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener la lista de Organizaciones:', error);
      }
    };

    fetchData(); */
  }, []);


  // // Filtrar los datos cuando el término de búsqueda cambie
  // useEffect(() => {
  //   if (searchTerm) {
  //     const filteredData = listaOrganizaciones.filter((organizacion) => {
  //       return (
  //         organizacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         organizacion.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         organizacion.telefono.includes(searchTerm) ||
  //         organizacion.email.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //     });
  //     setFilteredData(filteredData);
  //   } else {
  //     // Si no hay término de búsqueda, mostrar todos los datos
  //     setFilteredData(listaOrganizaciones);
  //   }
  // }, [searchTerm, listaOrganizaciones]);

  // const handleShowModal = (Organ) => {
  //   if (Organ) {
  //     setFormData(Organ);
  //   } else {
  //     setFormData({
  //       id: '',
  //       name: '',
  //       description: '',
  //     });
  //   }
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  // const handleChange = (e) => {
  //   if (e.target.type === 'file') {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.files[0],
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formDataToSend = new FormData();
  //     formDataToSend.append('nombre', formData.nombre);
  //     formDataToSend.append('direccion', formData.direccion);
  //     formDataToSend.append('telefono', formData.telefono);
  //     formDataToSend.append('email', formData.email);
  //     formDataToSend.append('descripcion', formData.descripcion);

  //     if (formData.imagen instanceof File) {
  //       formDataToSend.append('imagen', formData.imagen);
  //     }

  //     console.log('Datos enviados al backend:', formDataToSend);

  //     const response = await instance.post('/organizaciones/registrar', formDataToSend, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });

  //     // Verificar si la respuesta es exitosa
  //     if (response.status === 200) {
  //       // Mostrar el modal de éxito
  //       setShowSuccessAlert(true);

  //       // Establecer un temporizador para ocultar el modal después de 3 segundos
  //       setTimeout(() => {
  //         setShowSuccessAlert(false);
  //       }, 3000);
  //     } else {
  //       // Mostrar el modal de error con el mensaje del servidor
  //       const responseData = await response.json();
  //       alert(responseData.error); // Puedes personalizar el mensaje de error como desees
  //       setShowErrorAlert(true);

  //       // Establecer un temporizador para ocultar el modal de error después de 3 segundos
  //       setTimeout(() => {
  //         setShowErrorAlert(false);
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.error('Error al guardar la organización:', error);
  //     // Mostrar el modal de error genérico en caso de error
  //     setShowErrorAlert(true);

  //     // Establecer un temporizador para ocultar el modal de error después de 3 segundos
  //     setTimeout(() => {
  //       setShowErrorAlert(false);
  //     }, 3000);
  //   }
  // };

  // console.log('listaOrganizaciones: \n', listaOrganizaciones);

  // const handleUserClick = (id) => {
  //   // Redireccionar a la página de detalle del usuario con el ID correspondiente
  //   window.location.href = `/admin/organizaciones/${id}`;
  // };





  // const data = [
  //   {
  //     "id_producto": 1,
  //     "nombre": "producto 1",
  //     "descripcion": "Descripción del producto 1",
  //     "organizacion": "Organización A"
  //   },
  //   {
  //     "id_producto": 2,
  //     "nombre": "producto 2",
  //     "descripcion": "Descripción del producto 2",
  //     "organizacion": "Organización B"
  //   },
  //   {
  //     "id_producto": 3,
  //     "nombre": "producto 3",
  //     "descripcion": "Descripción del producto 3",
  //     "organizacion": "Organización C"
  //   }
  // ]

  // console.log(datos)


  return (

    <div>
      <h1 className='titulo'>Lista de Productos</h1>

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
            }} className="buttonRegistrar" onClick={() => handleShowModal()}>Crear Producto</Button>
          </div>
        </Form>

        <CrudTable data={datos} />

      </div>


      <AlertaModal />

    </div>
  );
};

export default ListaOrganizaciones;