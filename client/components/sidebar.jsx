import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar bg-secondary mt-5 pt-5  fixed-start h-100">
      <Nav className="justify-content-center flex-grow-1 pe-3 pt-5">
                  <Link href={"/estadisticas"}>
                    <Button variant="secondary">Estadísticas</Button>
                  </Link>
                  <Link href={"/organizaciones"}>
                    <Button variant="secondary">Organizaciones</Button>
                  </Link>
                  <Link href={"/servicios"}>
                    <Button variant="secondary">Servicios</Button>
                  </Link>
                  <Link href={"/usuarios"}>
                    <Button variant="secondary">Usuarios</Button>
                  </Link>
                </Nav>
    </div>
  );
};

export default Sidebar;
