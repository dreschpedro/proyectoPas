import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

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
      <Button variant="secondary" onClick={toggleModal} className='mx-5 d-flex justify-content-lg-end'>
        [UserName]
      </Button>
      </div>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>[Username]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Button variant="secondary" onClick={toggleModal}>
              Administrar Usuario
            </Button>
            <Button variant="secondary" onClick={toggleModal}>
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
        <Navbar key={expand} expand={expand} className="bg-secondary mb-3 fixed-top">
          <Container fluid>
            <Navbar.Brand href="#" className="mx-4">
              <Link href="/">
                <Button variant="secondary">[PasIcon]</Button>
              </Link>
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
                <Nav className="justify-content-center flex-grow-1 pe-3 d-lg-none">
                  <Link href={"/estadisticas"}>
                    <Button variant="secondary">Estadísticas</Button>
                  </Link>
                  <Link href={"/instituciones"}>
                    <Button variant="secondary">Instituciones</Button>
                  </Link>
                  <Link href={"/servicios"}>
                    <Button variant="secondary">Servicios</Button>
                  </Link>
                  <Link href={"/usuarios"}>
                    <Button variant="secondary">Usuarios</Button>
                  </Link>
                </Nav>
                <MenuModal/>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Navigation2;
