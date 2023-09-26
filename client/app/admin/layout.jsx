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
import { getDecodedToken } from '../auth';



const authToken = Cookies.get('authToken');
  console.log('aca esta el jwt desde las cookies', authToken);

const decodedToken = getDecodedToken(authToken);
console.log('token decodificado desde el layout: ',decodedToken);

  if (decodedToken) {
    // Ahora puedes acceder a las propiedades del token decodificado
    console.log('aca estan descrifrados los datos del jwt:', decodedToken); // Reemplaza 'usuario' con la propiedad real que quieras acceder
  }


const Nav = dynamic(() => import("../../components/adminPanel/navigation"), { ssr: false });
const Nav2 = dynamic(() => import("../../components/adminPanel/sidebar"), { ssr: false });



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
