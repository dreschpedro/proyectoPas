"use client"
import React, { useState, useEffect } from 'react';
import { Container, Table, InputGroup, Button, Modal, Form } from 'react-bootstrap';
import instance, { serverURL } from '@/app/axiosConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useParams } from 'next/navigation'; 
import axios from 'axios';

const ProductsCrud = () => {
  const [cantidadAgregada, setCantidadAgregada] = useState(0);
  const [datos, setDatos] = useState([]);
  const router = useRouter();
  const [products, setProducts] = useState([]); 
  const [organizaciones, setOrganizaciones] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({
    nombre: '',
    descripcion: '',
  });
  const [productInfo, setProductInfo] = useState({
    id_organizacion: '',
  });
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchOrganizaciones = async () => {
      try {
        const response = await instance.get('/organizaciones');
        setOrganizaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las organizaciones:', error);
      }
    };

    const fetchProductos = async () => { // Cambio de servicios a productos
      try {
        const response = await instance.get('/producto'); // Cambio de servicios a productos
        setUpdatedProducts(response.data); // Cambio de servicios a productos
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchOrganizaciones();
    fetchProductos();
  }, []);

  const handleCloseModal = () => {
    setSelectedProductId(null);
    setShowModal(false);
  };

  const handleShowDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    if (accountDeleted) {
      setTimeout(() => {
        router.push('/admin/producto/crudproducto');
      }, 2000);
    }
  };

  const setOrganizacionValue = (organizacionId) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      id_organizacion: organizacionId,
    }));
  };

  const handleShowModal = (product) => {
    setSelectedProductId(product.id_producto);
    setSelectedProduct(product);
    setProductInfo({ id_organizacion: product.id_organizacion });
    setShowModal(true);
  };

  const showAndCloseConfirmation = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  };

  const handleDeleteAccount = async () => {
    try {
      await instance.put(`/producto/estado/${selectedProductId}`); // Cambio de servicios a productos
      console.log('Producto eliminado exitosamente');

      const updatedProduct = products.find(product => product.id_producto === selectedProductId);
      if (updatedProduct) {
        setUpdatedProducts([updatedProduct, ...updatedProducts]);
      }

      setAccountDeleted(true);
      handleCloseDeleteModal();
      showAndCloseConfirmation();
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
    }
    updateData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nombre: selectedProduct.nombre,
        descripcion: selectedProduct.descripcion,
        id_organizacion: productInfo.id_organizacion,
      };

      if (selectedProductId) {
        await axios.put(`${serverURL}/producto/${selectedProductId}`, dataToSend); // Cambio de servicios a productos
        console.log('Producto editado exitosamente');
      } else {
        const response = await axios.post(`${serverURL}/producto/registrar`, dataToSend); // Cambio de servicios a productos
        console.log(response.data.message);
      }
      handleCloseModal();

      console.log('Guardando cambios');
      fetchProductos();
      showAndCloseConfirmation();

      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
    updateData();
  };

  const organizacion = '';

  useState(() => {
    axios.get(`${serverURL}/producto/activo${organizacion}`) // Cambio de servicios a productos
      .then(response => {
        setDatos(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      })
  }, []);

  const updateData = () => {
    axios.get(`${serverURL}/producto/activo${organizacion}`) // Cambio de servicios a productos
      .then(response => {
        setDatos(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };

  return (
    <Container className='mt-3'>
      <div className='d-flex justify-content-between flex-wrap mb-3'>
        <h1 className='titulo'>Gestión de Productos</h1>
        <button
          className='buttonRegistrar responsive-buttons'
          size="lg"
          onClick={() => handleShowModal({ id_producto: null, id_organizacion: '', nombre: '', descripcion: '' })}
        >
          Agregar Producto
        </button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#101488', color: '#ffffff', borderTopLeftRadius: '5px' }}>Nombre</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Descripción</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Organización</th>
            <th style={{ backgroundColor: '#101488', color: '#ffffff' }}>Cantidad</th>
            <th style={{ borderTopRightRadius: '5px', backgroundColor: '#101488', color: '#ffffff' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id_producto} style={{ marginBottom: '10px' }}>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.organizacion}</td>
              <td>{item.stock}</td>
              <td className="d-flex justify-content-center ">
              <Button
                variant="outline-success"
                onClick={() => handleShowModal(item)}
                style={{ width: '40px', fontWeight: 'bold', margin: '5px' }}
                >
                <FontAwesomeIcon icon={faPlus} />
              </Button> 

                <Button
                  style={{ width: '40px', fontWeight: 'bold', margin: '5px' }}
                  variant="outline-warning"
                  onClick={() => handleShowModal(item)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleShowDeleteModal(item.id_producto)}
                  style={{ width: '40px', fontWeight: 'bold', margin: '5px' }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProductId ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Control
                className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                placeholder='Nombre del producto'
                type="text"
                name="nombre"
                required
                value={selectedProduct.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formOrganizacion">
              <InputGroup>
                <Form.Control
                  className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                  placeholder='Organización'
                  as="select"
                  value={productInfo.id_organizacion}
                  onChange={(e) => setOrganizacionValue(e.target.value)}
                  required
                >
                  <option value="">Seleccionar Organización</option>
                  {organizaciones.map((organizacion) => (
                    <option key={organizacion.id_organizacion} value={organizacion.id_organizacion}>
                      {organizacion.nombre}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción del Producto</Form.Label>
              <Form.Control
                className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                as="textarea"
                name="descripcion"
                value={selectedProduct.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button type="button" className='bouttoncancel' onClick={handleCloseModal}>Cerrar</button>
              {selectedProductId ? (
                <button className='buttonRegistrar' type="submit">Guardar Cambios</button>
              ) : (
                <button className='buttonRegistrar' type="submit">Agregar Producto</button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea eliminar el Producto?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmation} onHide={handleConfirmationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Operación Exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Producto Eliminado Exitosamente!
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductsCrud;
