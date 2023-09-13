
"use client"
import React, { useState, useEffect } from 'react';
import { Form, FormSelect } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { fetchDepartamentos, fetchLocalidades } from '@/app/api/funciones/regional';
import { Grupo, Input, Select } from './Input';


function FormCliente() {

  {/* Funciones 2do Form */ }

  const [formData, setFormData] = useState({
    id_cliente: '',
    organizacion: '',
    servicio: '',
    apellidos: '',
    nombre: '',
    dni: '',
    fechaNacimiento: '',
    genero: '',
    email: '',
    contacto: '',
    telefono: '',
    departamento: '',
    localidad: '',
    ocupacion: '',
    domicilio: '',
    id_organizacion: '',
  });

  const genreDB = ['masculino', 'femenino', 'noBinario', 'noDecir'];
  const genreView = ['Masculino', 'Femenino', 'No Binario', 'Prefiero no Decirlo'];

  const searchByDNI = async (dni) => {
    setSearchInProgress(true);
    try {
      console.log('Searching by DNI:', dni);
      const response = await instance.get(`/cliente/dni/${dni}`);
      const data = response.data;
      console.log('Search Result:', data);

      const idClienteEncontrado = data.id_cliente;
      const dniClienteEncontrado = data.dni;

      const departamentoId = data.departamento;
      const localidadId = data.localidad;

      setSelectedDepartamento(departamentoId);
      setSelectedLocalidad(localidadId);

      // Actualiza el estado del formData para llenar los campos del formulario con los resultados de la búsqueda
      setFormData((prevData) => ({
        ...prevData,
        id_cliente: idClienteEncontrado,
        dni: dniClienteEncontrado,
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero || formData.genero,
        email: data.email,
        contacto: data.contacto,
        telefono: data.telefono,
        departamento: departamentoId,
        localidad: localidadId,
        ocupacion: data.ocupacion,
        domicilio: data.domicilio,
      }));

      // Obtén y llena los departamentos y localidades según los IDs
      const departamentosData = await fetchDepartamentos();
      const sortedDepartamentos = departamentosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setDepartamentos(sortedDepartamentos);

      const localidadesData = await fetchLocalidades(departamentoId);
      const sortedLocalidades = localidadesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setLocalidades(sortedLocalidades);
    } catch (error) {
      console.error('Error al buscar por DNI:', error);
    } finally {
      setSearchInProgress(false);
    }
  };

  const handleDepartamentoChange = async (departamentoId) => {
    console.log('handleDepartamentoChange triggered with departamentoId:', departamentoId);

    setSelectedDepartamento(departamentoId);
    setSelectedLocalidad('');

    const localidadesData = await fetchLocalidades(departamentoId);
    // console.log('Localidades Data:', localidadesData);
    const sortedLocalidades = localidadesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setLocalidades(sortedLocalidades);

    setFormData((prevData) => ({
      ...prevData,
      departamento: departamentoId,
      localidad: '',
    }));
    console.log('Departamento: ', departamentoId);
  };

  const handleLocalidadChange = async (localidad_id) => {
    setSelectedLocalidad(localidad_id);

    setFormData((prevData) => ({
      ...prevData,
      localidad: localidad_id,
    }));
    console.log('Localidad:', localidad_id);
  };

  const dbDate = new Date(formData.fechaNacimiento);
  const formattedDate = `${dbDate.getDate()}/${dbDate.getMonth() + 1}/${dbDate.getFullYear()}`;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const departamentosData = await fetchDepartamentos();
        const sortedDepartamentos = departamentosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setDepartamentos(sortedDepartamentos);

        // Fetch localidades based on the selectedDepartamento
        if (selectedDepartamento) {
          const localidadesData = await fetchLocalidades(selectedDepartamento);
          const sortedLocalidades = localidadesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setLocalidades(sortedLocalidades);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'fechaNacimiento') {
      setFormData((prevData) => ({
        ...prevData,
        fechaNacimiento: value, // Mantén la fecha en el formato aaaa-mm-dd
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDateToSend = formData.fechaNacimiento.split('/').reverse().join('-');

      const id_cliente = formData.id_cliente;
      // Si no hay un id_cliente
      if (!id_cliente) {

        const nuevoClienteData = {
          fechaNacimiento: formattedDateToSend,
          apellido: formData.apellido,
          nombre: formData.nombre,
          dni: formData.dni,
          genero: formData.genero,
          email: formData.email,
          contacto: formData.contacto,
          telefono: formData.telefono,
          departamento: formData.departamento,
          localidad: formData.localidad,
          ocupacion: formData.ocupacion,
          domicilio: formData.domicilio,
        };
        // Realiza el POST para registrar el nuevo cliente
        console.log('Datos nuevo cliente:', nuevoClienteData);
        const nuevoClienteResponse = await instance.post('/cliente/registrar', nuevoClienteData);

        // Obtén el dni del nuevo cliente registrado
        const dniNuevoCliente = nuevoClienteResponse.data.dni;
        console.log('dniNuevoCliente: ', dniNuevoCliente);

        // Realiza el POST para registrar el servicio con el nuevo cliente
        const servRealResponse = await instance.post('/serv_real/registrar_con_cliente', {
          dni: dniNuevoCliente,
          id_servicio: formData.servicio,
        });

        console.log('Servicio registrado con nuevo cliente', servRealResponse.data);
      } else {
        if (formData.dni && formData.servicio) {
          // Ahora puedes usar el id_cliente para realizar el POST con cliente existente
          await instance.post('/serv_real/registrar_con_cliente', {
            dni: formData.dni,
            id_servicio: formData.servicio,
          });

          console.log('Servicio registrado con cliente existente');
        } else {
          console.log('Selecciona un servicio y carga los datos del cliente');
        }

        console.log('Saving changes');
        // Fetch updated services and close modal
        fetchServicios();
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  {/*Fin Funciones 2do Form */ }


  return (
    <>
      {/* inicio componente 2 */}



      <h1 className='titulo'>Información</h1>
      <Form
        // onSubmit={handleSubmit} 
        className='bordesito' >

        <Row>

          <Col md>

            <Form.Group controlId="formDNI">
              <Form.Group className="mt-5 mb-5" controlId="exampleForm.ControlInput1">
                <div className="input-group">
                  <Form.Control
                    className="border-secondary rounded rounded-1.1 shadow "
                    type="number"
                    as="input"
                    name="dni"
                    // value={formData.dni}
                    // required={!searchInProgress}
                    // onChange={handleInputChange}
                    placeholder="DNI"
                  />

                  <button
                    style={{ marginLeft: '0.5rem', borderRadius: '5px' }}
                    className="buscarbutton"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   searchByDNI(formData.dni);
                  // }
                  // }
                  >

                    <FontAwesomeIcon icon={faSearch} style={{ color: "#FFFF", }} />

                  </button>
                </div>
              </Form.Group>
            </Form.Group>

            {/* <Grupo className="mt-5 mb-5">
              <div className="input-group">
                <Input name={'dni'}
                  className={'border-secondary rounded rounded-1.1 shadow'}
                  type={'numero'}
                  value={formData.dni}
                  required={''}
                  onChange={handleInputChange}
                  placeholder={'DNI'}
                ></Input>
                <button
                  style={{ marginLeft: '0.5rem', borderRadius: '5px' }}
                  className="buscarbutton"
                // onClick={(e) => {
                //   e.preventDefault();
                //   searchByDNI(formData.dni);
                // }
                // }
                >

                  <FontAwesomeIcon icon={faSearch} style={{ color: "#FFFF", }} />

                </button>
              </div>
            </Grupo> */}

            <Input name={'apellido'}
              type={'string'}
              value={formData.apellido}
              required={''}
              onChange={handleInputChange}
              placeholder={'Apellidos'}
            ></Input>

            <Input name={'nombre'}
              type={'string'}
              value={formData.nombre}
              required={''}
              onChange={handleInputChange}
              placeholder={'Nombres'}
            ></Input>

            <Input name={'fechaNacimiento'}
              type={'date'}
              value={formData.fechaNacimiento}
              required={''}
              onChange={handleInputChange}
            // placeholder={'dd/mm/aaaa'}
            ></Input>

            <Form.Group controlId="formGenero">
              {/* <Form.Label>Género</Form.Label> */}
              <FormSelect
                className='border border-secondary rounded rounded-1.1 shadow mt-5'
                as="select"
                name="genero"
              // value={formData.genero}
              // onChange={handleInputChange}
              // required={!searchInProgress}
              >
                <option value="">Seleccione el Género</option>
                {/* {genreDB.map((genero, index) => (
                  <option key={genero} value={genero}>
                    {genreView[index]}
                  </option>
                ))} */}
              </FormSelect>
            </Form.Group>

            <Input name={'email'}
              type={'email'}
              value={formData.email}
              required={''}
              onChange={handleInputChange}
              placeholder={'Email'}
            ></Input>

          </Col>
          <Col md>

            <Input name={'contacto'}
              type={'numero'}
              value={formData.contacto}
              required={''}
              onChange={handleInputChange}
              placeholder={'Contacto'}
            ></Input>

            <Select name={'departamento'}
              value={formData.departamento}
              required={''}
              onChange={handleDepartamentoChange}
              mensaje={'el Departamento'}
            ></Select>

            <Select name={'departamento'}
              value={formData.departamento}
              required={''}
              onChange={handleDepartamentoChange}
              mensaje={'la Localidad'}
            ></Select>

            <Input name={'domicilio'}
              type={'text'}
              value={formData.domicilio}
              required={''}
              onChange={handleInputChange}
              placeholder={'Domicilio'}
            ></Input>

            <Input name={'ocupacion'}
              type={'string'}
              value={formData.ocupacion}
              required={''}
              onChange={handleInputChange}
              placeholder={'Ocupación'}
            ></Input>

            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '49px' }}>
              <button type="submit" className='bouttoncancel'>
                Cancelar
              </button>

              <button className='buttonRegistrar' type="submit"
              //  disabled={!isFormValid}
              >
                Registrar Servicio
              </button>
            </div>

          </Col>
        </Row>
      </Form >
    </>
  )
}

export default FormCliente