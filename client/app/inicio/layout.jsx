"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';


function layout() {
    return (
        <>
            <div style={{ width: '100%', height: '12vh' }} className='headerInicio'>
                <h1><b>#COMPROMISO DESDE EL CORAZÓN </b></h1> <FontAwesomeIcon icon={faHeart}
                    style={{ width: '50px', height: '50px', marginLeft: '25px' }} />
            </div>
            <div style={{ width: '100%', height: '50vh' }} className='article1Inicio'>

                <div className="d-flex flex-nowrap my-auto">
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

                <div className='position-relative my-auto'>
                    <Image
                        src="/img/elvice.svg"
                        width={510}
                        height={259}
                        alt="Picture of the author"
                    />

                    <div className='position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column justify-content-center align-items-center '>
                        <div className='blur-background2 ' style={{ marginLeft: '45%', marginTop: '15%' }}>
                            <p style={{ fontFamily: 'Marcellus SC', color: '#FFFFFF' }}>Una locura las cosas que <br /> pasan en el PAS cahabón 🤯🤙🤑</p>
                            <button className='buttonRegistrar' style={{ borderRadius: '5px', width: '130px', marginLeft: '100px' }}>
                                <b> <a style={{ color: 'inherit', textDecoration: 'none' }} href="https://vicegobernacion.misiones.gob.ar/">+ Información</a></b>
                            </button>
                        </div>
                    </div>
                </div>





            </div>
            <div style={{ width: '100%', height: '50vh' }} className='article2Inicio d-flex justify-content-center aling-content-center'>

                <div className='contbutton1'>
                    <div className='d-flex flex-column' style={{ backgroundColor: '#DC1F25' }}>
                        <Image
                            src="/img/provinciaTransparente.svg"
                            width={150}
                            height={70}
                            alt="Picture of the author"

                        />

                        <Image
                            src="/img/pas-blanco 1.svg"
                            width={150}
                            height={110}
                            alt="Picture of the author"

                        />
                    </div>
                    <div>Programa de Asistencia Solidaria - VICEGOBERNACIÓN</div>
                </div>
                <div className='contbutton2'>
                    <div className='d-flex flex-column justify-content-center aling-content-center part1' >
                        <Image
                            src="/img/provinciaTransparente.svg"
                            width={150}
                            height={70}
                            alt="Picture of the author"

                        />
                        <div className='mt-4 mb-4'>
                            <Image
                                src="/img/pas-blanco 1.svg"
                                width={150}
                                height={110}
                                alt="Picture of the author"

                            />
                        </div>
                    </div >

                    <div className='part2'><p>Programa de Asistencia Solidaria -
                        P.A.S</p></div>
                </div>

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

export default layout