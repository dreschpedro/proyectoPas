import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import Row from 'react-bootstrap';
import Col from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="sidebar mt-5 pt-5  fixed-start h-100 " style={{backgroundColor: '#101488'}}>
      <Nav className='d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: '#101488'}}>
                  
                  
                  <div className='buttoncito custom-link'>
                  <Link href={"dataEntry/organizaciones"} className='custom-link'>
                    Organizacion
                  </Link>
                  </div>
                  <div className='buttoncito'>
                  <Link href={"dataEntry/servicios"} className='custom-link'>
                    Servicios
                  </Link>
                  </div>
                  
                </Nav>
    </div>
  );
};

export default Sidebar;
