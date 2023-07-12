import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faBoxOpen, faBriefcase, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';



function NavbarL() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Navbar bg="light" data-bs-theme="light" expand="lg" fixed="left" sticky="top" style={{ height: '100vh' }}>
                <Container className="d-flex flex-column mb-90vh h-100vh">
                    <Nav className="mt-auto flex-column align-items-start"> {/* Agregamos align-items-start */}
                        <Nav.Link href="#home"><Button variant="secondary">
                            <FontAwesomeIcon icon={faChartBar} /> Estadísticas
                        </Button>

                        </Nav.Link>
                        <Nav.Link href="#features">
                            <Button variant="secondary">
                                <FontAwesomeIcon icon={faBoxOpen} /> Productos
                            </Button>
                        </Nav.Link>

                        <Nav.Link href="#services">
                            <Button variant="secondary" className="mr-2">
                                <FontAwesomeIcon icon={faBriefcase} /> Servicios
                            </Button>
                        </Nav.Link>

                        <Nav.Link href='#instituciones'>
                            <Button variant="secondary" className="mr-2">
                                <FontAwesomeIcon icon={faUniversity} /> Instituciones
                            </Button>
                        </Nav.Link>

                        <Nav.Link href='#instituciones'>
                            <Button variant="secondary" className="mr-2">
                                <FontAwesomeIcon icon={faUser} /> Instituciones
                            </Button>
                        </Nav.Link>

                    </Nav>
                </Container>
            </Navbar>

            <br />
        </div>
    );
}

export default NavbarL;
