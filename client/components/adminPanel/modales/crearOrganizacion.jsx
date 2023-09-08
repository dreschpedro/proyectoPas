import React from 'react'

function crearOrganizacion() {
  return (
    <Modal show={showModal} onHide={handleCloseModal} >
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? 'Editar Organización' : 'Agregar Organización'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} >

          <Row>
            <Col >

              <Form.Group controlId="formName">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Nombre de la Organización*</Form.Label> */}
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    required
                    onChange={handleChange}
                    placeholder="Nombre de la Organización" />
                </Form.Group>
              </Form.Group>

              <Form.Group controlId="formDomicilio">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Dirección*</Form.Label> */}
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    required
                    onChange={handleChange}
                    placeholder="Dirección" />
                </Form.Group>
              </Form.Group>


              <Form.Group controlId="formNumber">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Número de Teléfono*</Form.Label> */}
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="number"
                    name="telefono"
                    value={formData.telefono}
                    required
                    onChange={handleChange}
                    placeholder="Número de Teléfono" />
                </Form.Group>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Email*</Form.Label> */}
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="email"
                    name="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                    placeholder="Email" />
                </Form.Group>
              </Form.Group>

            </Col>


            {/* imagen de la Organización */}
            <Col md={{ order: 'last' }} xs={{ order: 'first' }}>

              <Form.Group controlId="formFile">
                <Form.Label>Subir imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="imagen"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Group className="" controlId="exampleForm.ControlInput1">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    className="mb-3 border border-secondary rounded rounded-1.1 shadow"
                    type="text"
                    as="textarea"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="" />
                </Form.Group>
              </Form.Group>

            </Col>
          </Row>

          <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
            <button type="button" className='bouttoncancel' onClick={handleCloseModal}>
              Cancelar
            </button>


            <button className='buttonRegistrar' type="submit" style={{ width: '60%' }}>
              Registrar Organización
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default crearOrganizacion
