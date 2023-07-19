"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navigation/>  
      <Container className='contenedor'>
      {children}
      </Container>
      
      
      </body>
    </html>
  )
}
