"use client"
import "../../sass/styles.scss"
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "next/image";
import { Container } from "react-bootstrap";




const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'P.A.S',
    description: 'Programa de asistencia solidaria',

}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div style={{ width: '100%', height: '100%'}}>
                <Image
                    alt="manos"
                    src="/img/loginBackground.png"
                    quality={100}
                    fill
                    sizes="100vw"
                    style={{
                        minHeight:'100vh',
                        width:'100%',
                        objectFit: 'cover',
                        backgroundAttachment: 'fixed',
                        
                        
                    }}
                />
                </div>
                {/* <picture>
                    <img src="/public/img/loginBackground.png" alt="" />
                </picture> */}
                <Container style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} >
                    <Row>

                        <Col className="d-flex align-items-center flex-column mt-0 mt-lg-5 mt-lg-5  col-md-6 col-sm-12">
                            <h1 className="text-white mt-5 d-none d-sm-block d-md-block ">BIENVENIDO</h1>

                            <div className="d-flex flex-nowrap m-5">
                                <div>
                                    <Image
                                        src="/img/logoPasColor.svg"
                                        width={240}
                                        height={200}
                                        alt="Picture of the author"

                                    />
                                </div>
                                <div class="d-flex  align-items-center">
                                    <h3 className="text-white text-center  d-none d-sm-block d-md-block ">Programa de <br /> Asistencia Solidaria</h3>
                                </div>
                            </div>


                        </Col>


                        <Col className="mt-0 mt-lg-5 mt-lg-5 col-md-6 col-sm-12">
                            <div className="mt-5" style={{height: '600px'}}>
                                {children}
                            </div>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-between  mt-5 px-3 ">
                        <div className="">
                            <Image
                                src="/img/misionesGob.png"
                                width={130}
                                height={50}
                                alt="Picture of the author"
                            />

                        </div>
                        <div>
                            <div className="d-flex flex-nowrap  ">
                                <p className=" mx-2 mt-1 ext-center text-white">Desarrollado por</p>
                                <Image
                                    src="/img/SM 2023 - DIGITAL FACTORY color 1.png"
                                    width={80}
                                    height={40}
                                    alt="Picture of the author"
                                />
                            </div>
                        </div>

                    </div>
                </Container>



            </body>
        </html>
    )
}
