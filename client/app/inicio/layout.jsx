"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';


function layout() {
    return (
        <>
            <div style={{ width: '100%', height: '9vh' }} className='headerInicio'>
                <h1><b>#COMPROMISO DESDE EL CORAZÓN </b></h1> <FontAwesomeIcon icon={faHeart}
                    style={{ width: '50px', height: '50px', marginLeft: '25px' }} />
            </div>
            <div style={{ width: '100%', height: '40vh' }} className='article1Inicio'>

                <div className="d-flex flex-nowrap">
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

                <div style={{width:'300px',height:'300px'}}>
                    <Carousel data-bs-theme="dark">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="holder.js/800x400?text=First slide&bg=f5f5f5"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h5>First slide label</h5>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="holder.js/800x400?text=Second slide&bg=eee"
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="holder.js/800x400?text=Third slide&bg=e5e5e5"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>


            </div>
            <div style={{ width: '100%', height: '40vh' }} className='article2Inicio'></div>


            <div style={{ width: '100%', height: '18vh' }} className='footerInicio'>



                <div style={{ margin: '30px' }}>
                    <Image
                        src="/img/misionesGob.png"
                        width={190}
                        height={80}
                        alt="Picture of the author"

                    />
                </div>
            </div>

        </>
    )
}

export default layout