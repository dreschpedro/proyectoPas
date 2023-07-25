"use client"
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link'
import './navigation.css'
import { Button } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="mb-3" fixed="top">
      <Container>
      <Link href={"/"}><Button variant="dark">P.A.S</Button></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href={"/estadisticas"}><Button variant="dark">Estadísticas</Button></Link>
            <Link href={"/instituciones"}><Button variant="dark">Instituciones</Button></Link>
            <Link href={"/productos"}><Button variant="dark">Productos</Button></Link>
            <Link href={"/servicios"}><Button variant="dark">Servicios</Button></Link>
            <Link href={"/usuarios"}><Button variant="dark">Usuarios</Button></Link>
            
            
            <NavDropdown title="[UserName]" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;