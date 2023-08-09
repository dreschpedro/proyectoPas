
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../public/pas-blanco.png'
import Pagination from 'react-bootstrap/Pagination';



const MenuModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCerrarSesion = () => {
    // Aquí agregar la lógica para cerrar sesión
    // Por ejemplo, redireccionar a la página de inicio de sesión
    console.log('Cerrando sesión...');
    toggleModal(); // Cerramos la modal después de hacer clic en "Cerrar Sesión"
  };

  return (
    <>
      <div className="ms-auto">

        <FontAwesomeIcon icon={faCircleUser} style={{ color: "#ffffff" }} onClick={toggleModal} className='mx-5 d-flex justify-content-lg-end mx-lg-5  iconUser' />

      </div>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>[Username]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='d-flex flex-column justify-content-center align-items-center'>
            <Button variant="secondary" onClick={toggleModal} className=''>
              Administrar Usuario
            </Button>
            <Button variant="secondary" onClick={toggleModal} className='mt-3'>
              Ayuda y Soporte tecnico
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cerrar Sesion
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

function Navigation2() {
  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} data-bs-theme="dark" className=" mb-3 fixed-top" style={{ backgroundColor: '#101488' }}>
          <Container fluid>
            <Navbar.Brand href="#" className="mx-4 d-flex flex-nowrap">
              <Link href="/">
                <button className='homebutton ' >
                  <img src={logo} alt="logo" />
                  <p>Programa de <br /> Asitencia Solidaria</p>


                </button>
              </Link>

              <div className='d-flex flex-nowrap'>
              <Pagination className='mx-3 h-50 my-auto'>
                <Pagination.Prev className='h-50'/>
                <Pagination.Next className=''/>
              </Pagination>


              <Form.Control
                className='h-80 my-auto w-80'
                placeholder="Buscador"
                aria-label="Buscador"
                aria-describedby="basic-addon2"
              />
              </div>

            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>P.A.S</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="d-flex justify-content-center align-items-center flex-grow-1 pe-3 d-lg-none">

                  <div className='buttoncito' ><MenuModal /></div>

                  <Link href={"/estadisticas"} style={{ marginTop: '15px' }} className='custom-link'>
                    <div className='buttoncito' >Estadísticas</div>
                  </Link>
                  <div className='buttoncito custom-link'>
                    <Link href={"/organizaciones"} className='custom-link'>
                      Organizaciones
                    </Link>
                  </div>
                  <div className='buttoncito'>
                    <Link href={"/servicios"} className='custom-link'>
                      Servicios
                    </Link>
                  </div>
                  <Link href={"/usuarios"} className='custom-link'>
                    <div className='buttoncito'>Usuarios</div>
                  </Link>
                </Nav>
                <MenuModal />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Navigation2;
