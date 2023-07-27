"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'P.A.S',
  description: 'Programa de asistencia solidaria',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navigation/>  
      <Container className='contenedor pt-5'>
      {children}
      </Container>
      
      
      </body>
    </html>
  )
}
