"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navigation2 from '@/components/navigartion2';
// import UserProvider from "../context/user";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import("../components/navigartion2"), { ssr: false });


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
      <Container className='contenedor pt-5'>
      {children}
      </Container>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      
      </body>
    </html>
  )
}
