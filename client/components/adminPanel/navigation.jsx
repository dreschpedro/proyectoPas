
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { faCircle, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-bootstrap/Pagination';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const router = useRouter();


  const isAdminRoute = router.pathname.includes('/admin');

  const goBack = () => {
    if (isAdminRoute) {
      window.history.back(); // Navega a la página anterior
    }
  };


  if (isAdminRoute) {
    const goForward = () => {
      window.history.forward(); // Navega a la página siguiente (si está disponible)
    }
  };
};
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
          <Form className='d-flex flex-column justify-content-center align-items-center '>

            {/* <Link href={"/admin/usuarios/[id]"}> */}
            <button onClick={toggleModal} className='buttonLogin' style={{ width: '50%', margin: 'auto' }}>
              Administrar Usuario
            </button>
            {/* </Link> */}

            {/* <Link href={"https://www.digitalfactory.com.ar/"}> */}
            <a href={"https://www.digitalfactory.com.ar/"} onClick={toggleModal} className='mt-3 buttonLogin text-nowrap text-decoration-none d-flex justify-content-center align-items-center' style={{ width: '50%', margin: 'auto' }}>
              Ayuda y Soporte tecnico
            </a>
            {/* </Link> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='bouttoncancel' onClick={toggleModal}>
            Cerrar Sesion
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

function Navigation2() {
  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className=" mb-3 fixed-top" style={{ backgroundColor: '#101488' }}>
          <Container fluid>
            <Navbar.Brand href="#" className="mx-4 d-flex flex-nowrap">


              <div style={{ marginLeft: '13px', width: '184px', }}>

                <button className='homebutton d-flex flex-nowrap' >
                  <Link href="/admin" style={{ textDecoration: 'none', display: 'flex', flex: 'none', flexWrap: 'nowrap', padding: 'auto' }}>
                    <Image
                      src="/img/pas-blanco.png"
                      width={30}
                      height={30}
                      alt="Picture of the author"
                    />
                    <p ><b> Programa de <br /> Asitencia Solidaria</b></p>
                  </Link>
                </button>
              </div>


              {/* estos botones de navegacion los dejo por que si pasamos el software a elcetron o ionic,
               va a ser necesario implementar esta funcionalidad*/}
              <div className='d-flex flex-nowrap'>




                {/* <Pagination className='mx-3 my-auto '>
                  <Pagination.Prev onClick={goBack} className='mx-1' />
                  <Pagination.Next onClick={goForward} className='mx-1' />
                </Pagination> */}




                {/*esto lo dejo comentado por que con gonzalo llegamos a
                 la conclucion de que se veia "cheto" pero no tenia una funcionalidad real */}
                {/* <Form.Control
                  className='h-80 my-auto'
                  placeholder="Buscador"
                  aria-label="Buscador"
                  aria-describedby="basic-addon2"
                /> */}
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


                  <div className='buttoncito'>
                    <Link href={"/admin/consultas"} className='custom-link d-flex align-items-center'>
                      <FontAwesomeIcon icon={faComment} style={{ color: "#ffffff", marginRight: '15px' }} />
                      <b>Consultas</b>
                    </Link>
                  </div>


                  <div className='buttoncito'>
                    <Link href={"/admin/estadisticas"} className='custom-link d-flex align-items-center'>
                      <FontAwesomeIcon icon={faChartLine} style={{ color: "#ffffff", marginRight: '15px' }} />
                      <b>Estadísticas</b>
                    </Link>
                  </div>




                  <div className='buttoncito'>
                    <Link href={"/admin/asistencias"} className='custom-link d-flex  align-items-center'>
                      <FontAwesomeIcon icon={faExchangeAlt} style={{ color: "#ffffff", marginRight: '15px' }} />
                      <b>Asistencias</b>
                    </Link>
                  </div>

                  <div className='buttoncito'>
                    <Link href={"/admin/registros"} className='custom-link d-flex  align-items-center'>
                      <FontAwesomeIcon icon={faEdit} style={{ color: "#ffffff", marginRight: '15px' }} />
                      <b>Registros</b>
                    </Link>
                  </div>
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
