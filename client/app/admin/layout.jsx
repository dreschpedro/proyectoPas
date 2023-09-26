"use client"
import "../../sass/styles.scss"
// import './globals.css'
import { Inter } from 'next/font/google'
// import Navigation from '@/components/navigation'
// import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navigation2 from '@/components/navigartion2';
// import UserProvider from "../context/user";
import dynamic from "next/dynamic";
// import Sidebar from '@/components/sidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from "js-cookie";
// import { cookies } from "next/dist/client/components/headers";
import jwtValidation from "../jwtValidation";

const Nav = dynamic(() => import("../../components/adminPanel/navigation"), { ssr: false });
const Nav2 = dynamic(() => import("../../components/adminPanel/sidebar"), { ssr: false });

jwtValidation();

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'P.A.S',
  description: 'Programa de asistencia solidaria',
  
}

export default function RootLayout({ children }) {
  // return (
  //   <html lang="en">
  //     <body className={inter.className}>
  //     <Nav/>  

  //     <Row className='vh-100'>
  //       <Col sm={2} className='d-none d-lg-block'>
  //       <Nav2 className="mt-5 pt-5 fixed-start "/>
  //       </Col>
  //       <Col className='mt-5' style={{marginLeft:'70px', marginRight:'70px'}}>
  //       {children}
  //       </Col>
  //     </Row>      
      
  //     </body>
  //   </html>
  // )
  const authToken = Cookies.get('authToken');
  console.log('aca estan las cookies papaaaaaa:', authToken);

  return (
    <html lang="en">
      <body className={inter.className}>
     <Nav/>  

    <div className="layout">
      <div className="sidebar">
        {/* Contenido de la barra lateral */}
        {/* Puedes agregar menús, enlaces, o cualquier otro contenido aquí */}
        <Nav2 />
      </div>
      <div className="content">
        {/* Contenido principal */}
        {children}
      </div>
    </div>
    </body>
  </html>
  );
}
