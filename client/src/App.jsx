import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavbarT from './components/NavbarT.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarL from './components/NavbarL.jsx'
import Main from './components/Main.jsx'


function App() {

  return (
    <>
      <div className='p-0 m-0'>
        <NavbarT />
        <div className='container p-0 m-0 d-flex flex-nowrap' style={{ height: '100vh' }}>
          <NavbarL />
          <Main />
        </div>


      </div>
    </>
  )
}

export default App
