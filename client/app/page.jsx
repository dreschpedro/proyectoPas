"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'




function home() {
  return (
    <>
      <div style={{ width: '100%', height: '12vh' }} className='headerInicio'>
        <h1><b>#COMPROMISO DESDE EL CORAZÓN </b></h1> <FontAwesomeIcon icon={faHeart}
          style={{ width: '50px', height: '50px', marginLeft: '25px' }} />
      </div>
      <div style={{ width: '100%', height: '50vh' }} className='article1Inicio'>

        <div className="d-flex flex-nowrap my-auto" >
          <div>
            <Image
              src="/img/logoPasColor.svg"
              width={180}
              height={140}
              alt="Picture of the author"

            />
          </div>
          <div class="d-flex  align-items-center">
            <h3 className="text-white text-center  d-none d-sm-block d-md-block ">Programa de <br /> Asistencia Solidaria</h3>
          </div>
        </div>

        <div className='position-relative my-auto' >
          <Image
            src="/img/elvice.svg"
            width={510}
            height={259}
            alt="Picture of the author"
          />

          <div className='position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column justify-content-center align-items-center '>
            <div className='blur-background2 ' style={{ marginLeft: '45%', marginTop: '15%' }}>
              {/* <p style={{ fontFamily: 'Marcellus SC', color: '#FFFFFF' }}>Una locura las cosas que <br /> pasan en el PAS chabón 🤯🤙🤑</p> */}
              <button className='buttonRegistrar' style={{ borderRadius: '5px', width: '130px', marginLeft: '100px' }}>
                <b> <a style={{ color: 'inherit', textDecoration: 'none' }} href="https://vicegobernacion.misiones.gob.ar/">+ Información</a></b>
              </button>
            </div>
          </div>
        </div>





      </div>
      <div style={{ width: '100%', height: '50vh' }} className='article2Inicio d-flex justify-content-center aling-content-center'>

        <Link href={"/login"} className='contbutton1'>
          <div className='d-flex flex-column part1' style={{ backgroundColor: '#DC1F25' }}>
            <Image
              src="/img/provinciaTransparente.svg"
              width={150}
              height={70}
              alt="Picture of the author"

            />
            <div className='mt-3 mb-3'>
              <Image
                src="/img/pas-blanco 1.svg"
                width={100}
                height={60}
                alt="Picture of the author"
              />
            </div>

          </div>
          <div className='part2 text-center'>Programa de Asistencia Solidaria - VICEGOBERNACIÓN</div>
        </Link>
        <Link href={"/login"} className='contbutton2'>
          <div className='d-flex flex-column justify-content-center aling-content-center part1' >
            <Image
              src="/img/provinciaTransparente.svg"
              width={150}
              height={70}
              alt="Picture of the author"
            />

            <div className='mt-3 mb-3'>
              <Image
                src="/img/pas-blanco 1.svg"
                width={100}
                height={60}
                alt="Picture of the author"
              />
            </div>
          </div >

          <div className='part2 text-center '><p>Programa de Asistencia Solidaria -
            P.A.S</p></div>
        </Link>
      </div>


      <div style={{ width: '100%', height: '18vh' }} className='footerInicio'>
        <div style={{ margin: '20px' }}>
          <Image
            src="/img/provinciaTransparente.svg"
            width={180}
            height={70}
            alt="Picture of the author"
          />
        </div>
      </div>

    </>
  )
}

export default home