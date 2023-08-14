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

const Nav = dynamic(() => import("../../components/consulAdmin/navigation"), { ssr: false });
const Nav2 = dynamic(() => import("../../components/consulAdmin/sidebar"), { ssr: false });


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'P.A.S',
  description: 'Programa de asistencia solidaria',
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Nav/>  

      <Row className='vh-100'>
        <Col sm={2} className='d-none d-lg-block'>
        <Nav2 className="mt-5 pt-5 fixed-start "/>
        </Col>
        <Col className='mt-5'>
        {children}
        </Col>
      </Row>


      {/* <div className='contenedor pt-5 d-flex mx-0'>
      <Sidebar/>
      {children}
      </div> */}
      
      
      </body>
    </html>
  )
}
