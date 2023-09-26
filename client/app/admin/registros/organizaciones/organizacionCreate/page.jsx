"use client"
import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import AlertaModal from '@/components/modales/alertaModal';

function RegistroOrganizacions() {
  const [selectedRol, setSelectedRol] = useState('');
  const [Organizaciones, setOrganizaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false); // Nuevo estado para controlar la visibilidad del modal
  const [previewImage, setPreviewImage] = useState('');
  const [conflict, setConflict] = useState(false);


  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    imagen: null,
    telefono: '',
    direccion: '',
    descripcion: '',
  });

  // Agrega el estado y la función para manejar el modal de alerta
  const [alerta, setAlerta] = useState(null);

  // Agrega un estado para controlar la visibilidad del botón de abrir modal
  const [showAlertButton, setShowAlertButton] = useState(false);

  useEffect(() => {
    instance
      .get('/organizaciones/')
      .then((response) => {
        console.log('Respuesta del backend:', response.data);
        setOrganizaciones(response.data);
      })
      .catch((error) => console.error('Error al obtener las Organizaciones:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.includes('image')) {
        setSelectedFile(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setPreviewImage(reader.result);
        };
      } else {
        console.log('El archivo seleccionado no es una imagen.');
      }
    }
  };

  const limpiarCampos = () => {
    setFormData({
      nombre: '',
      email: '',
      imagen: null,
      telefono: '',
      direccion: '',
      descripcion: '',
    });
    setPreviewImage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email) {
      console.error('El campo de correo electrónico es obligatorio.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('telefono', formData.telefono);
    formDataToSend.append('direccion', formData.direccion);
    formDataToSend.append('descripcion', formData.descripcion);

    if (selectedFile) {
      formDataToSend.append('imagen', selectedFile);
    }

    try {
      const userResponse = await instance.post('/organizaciones/registrar', formDataToSend);

      console.log('Organización registrada exitosamente:', userResponse.data);

      limpiarCampos();

      // Mostrar el modal de alerta con un estado "success" y un mensaje personalizado
      setAlerta({ estado: 'success', mensaje: 'Organización registrada exitosamente' });
      setShowModal(true); // Mostrar el modal
    } catch (error) {
      console.error('Error al registrar la Organización:', error);

      // Verificar si el error es debido a una violación de clave única (estado 409)
      if (error.response && error.response.status === 409) {
        // Mostrar un mensaje de conflicto
        setConflict(true);
      } else {
        // Mostrar el modal de alerta con un estado "error" y un mensaje de error
        setAlerta({ estado: 'error', mensaje: 'Error al registrar la Organización' });
        setShowModal(true); // Mostrar el modal
      }
    }
  }

  return (
    <>
      <h1 className='titulo'>Crear Organización</h1>
      <Form onSubmit={handleSubmit} className='bordesito' encType="multipart/form-data">
        <Row>
          <Col md>

            <Form.Group controlId="formName">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Nombre de la Organización*</Form.Label> */}
                <Form.Control
                  className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  required
                  onChange={handleInputChange}
                  placeholder="Nombre de la Organización" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formDomicilio">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Dirección*</Form.Label> */}
                <Form.Control
                  className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  required
                  onChange={handleInputChange}
                  placeholder="Dirección" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formNumber">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Número de Teléfono*</Form.Label> */}
                <Form.Control
                  className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="number"
                  name="telefono"
                  value={formData.telefono}
                  required
                  onChange={handleInputChange}
                  placeholder="Número de Teléfono" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Email*</Form.Label> */}
                <Form.Control
                  className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleInputChange}
                  placeholder="Email" />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="formDescripcion">
              <Form.Group
                // className="mb-3"
                controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Email*</Form.Label> */}
                <Form.Control
                  className='shadow border border-secondary rounded rounded-1.1 shadow mb-4 '
                  type="textarea"
                  name="descripcion"
                  value={formData.descripcion}
                  required
                  onChange={handleInputChange}
                  placeholder="Descripción" />
              </Form.Group>
            </Form.Group>

            {/* <Imagen /> */}
          </Col>
          <Col md={{ order: 'last' }} xs={{ order: 'first' }}>

            {/* imagen de la Organización */}

            <Form.Group controlId="formFile">
              {/* Label personalizado que actúa como un botón */}
              <label className="d-flex align-items-center imagebutton">
                {previewImage ? (
                  <img src={previewImage} alt="Vista previa de la imagen" className="imageIcon" />
                ) : (
                  <FontAwesomeIcon icon={faFileImage} className="imageIcon" />
                )}
                {/* El input de tipo archivo está oculto, pero se activa haciendo clic en el label */}
                <Form.Control
                  name="imagen"
                  className="d-none"
                  type="file"
                  onChange={onFileChange}
                />
              </label>
              {/* Vista previa de la imagen */}
              <Form.Label className='d-flex justify-content-center mb-5'>Seleccionar imagen del Organismo</Form.Label>
            </Form.Group>


          </Col>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
          <Link
            style={{
              textDecoration: 'none',
              color: '#22096F',
            }}
            href={"/admin/registros/organizaciones"}
          >
            <button className='bouttoncancel' style={{}}>
              Cancelar
            </button>
          </Link>

          <button
            className='buttonRegistrar'
            style={{ whiteSpace: 'nowrap', width: '190px' }}
            type="submit"
          >
            Registrar Organización
          </button>
        </div>
      </Form>
      {/* Mostrar el modal de conflicto */}
      {conflict && (
        <AlertaModal
          titulo="Error de conflicto"
          estado="error"
          mensaje="Ya existe una organización con este correo."
          show={conflict} // Controla la visibilidad del modal de conflicto
          onHide={() => setConflict(false)} // Oculta el modal de conflicto al hacer clic en el botón de cerrar
        />
      )}

      {/* Mostrar el modal de alerta */}
      {alerta && (
        <AlertaModal
          titulo={alerta.estado === 'success' ? 'Éxito' : 'Error'}
          estado={alerta.estado}
          mensaje={alerta.mensaje}
          show={showModal} // Controla la visibilidad del modal
          onHide={() => setShowModal(false)} // Oculta el modal al hacer clic en el botón de cerrar
        />
      )}

    </>
  );
}

export default RegistroOrganizacions;