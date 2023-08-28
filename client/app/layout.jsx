"use client"
import "../sass/styles.scss"
import './globals.css'
import { Inter } from 'next/font/google'
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
          
        {children}

      </body>
    </html>
  )
}
