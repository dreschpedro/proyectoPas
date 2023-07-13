import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faBoxOpen, faBriefcase, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';
import './styles2.css'


function NavbarL() {
    return (
        <div className='leftBanner'>
            
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
                                <FontAwesomeIcon icon={faUniversity} /> Instituci
                            </Button>
                        </Nav.Link>

                        <Nav.Link href='#instituciones'>
                            <Button variant="secondary" className="mr-2">
                                <FontAwesomeIcon icon={faUser} /> Usuarios
                            </Button>
                        </Nav.Link>

                    </Nav>
                </Container>
            

            <br />
        </div>
    );
}

export default NavbarL;
