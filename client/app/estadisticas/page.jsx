"use client"
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Form } from 'react-bootstrap';

const ServiciosEstadisticas = () => {
  // Datos de ejemplo para los 5 servicios y los 12 meses del año
  const data = [
    { mes: 'Enero', servicioA: 12, servicioB: 5, servicioC: 8, servicioD: 15, servicioE: 9 },
    { mes: 'Febrero', servicioA: 19, servicioB: 8, servicioC: 10, servicioD: 13, servicioE: 5 },
    { mes: 'Marzo', servicioA: 3, servicioB: 12, servicioC: 15, servicioD: 7, servicioE: 12 },
    { mes: 'Abril', servicioA: 5, servicioB: 10, servicioC: 12, servicioD: 9, servicioE: 8 },
    { mes: 'Mayo', servicioA: 2, servicioB: 7, servicioC: 5, servicioD: 10, servicioE: 11 },
    { mes: 'Junio', servicioA: 3, servicioB: 4, servicioC: 6, servicioD: 8, servicioE: 14 },
    { mes: 'Julio', servicioA: 7, servicioB: 9, servicioC: 12, servicioD: 11, servicioE: 13 },
    { mes: 'Agosto', servicioA: 8, servicioB: 11, servicioC: 9, servicioD: 7, servicioE: 10 },
    { mes: 'Septiembre', servicioA: 10, servicioB: 6, servicioC: 11, servicioD: 6, servicioE: 7 },
    { mes: 'Octubre', servicioA: 15, servicioB: 9, servicioC: 8, servicioD: 5, servicioE: 6 },
    { mes: 'Noviembre', servicioA: 9, servicioB: 14, servicioC: 7, servicioD: 4, servicioE: 9 },
    { mes: 'Diciembre', servicioA: 13, servicioB: 13, servicioC: 4, servicioD: 3, servicioE: 12 },
  ];

  // Datos de ejemplo para el ComboBox de instituciones
  const instituciones = [
    { id: 1, nombre: 'Institución 1' },
    { id: 2, nombre: 'Institución 2' },
    { id: 3, nombre: 'Institución 3' },
  ];

  const [selectedInstitucion, setSelectedInstitucion] = useState(null);
  const [topUsuarios, setTopUsuarios] = useState([
    { id: 1, nombre: 'Usuario 1', cantidad: 50 },
    { id: 2, nombre: 'Usuario 2', cantidad: 45 },
    { id: 3, nombre: 'Usuario 3', cantidad: 30 },
    { id: 4, nombre: 'Usuario 4', cantidad: 25 },
    { id: 5, nombre: 'Usuario 5', cantidad: 20 },
  ]);
  const [topServicios, setTopServicios] = useState([
    { id: 1, nombre: 'Servicio 1', cantidad: 100 },
    { id: 2, nombre: 'Servicio 2', cantidad: 90 },
    { id: 3, nombre: 'Servicio 3', cantidad: 80 },
    { id: 4, nombre: 'Servicio 4', cantidad: 70 },
    { id: 5, nombre: 'Servicio 5', cantidad: 60 },
  ]);
  const [graficoTipo, setGraficoTipo] = useState('estadisticas'); // Tipo de gráfico a mostrar (por defecto: estadisticas)

  // Función para manejar el cambio de institución seleccionada en el ComboBox
  const handleInstitucionChange = (selectedOption) => {
    setSelectedInstitucion(selectedOption);
  };

  // Función para manejar el cambio de tipo de gráfico seleccionado
  const handleGraficoTipoChange = (event) => {
    setGraficoTipo(event.target.value);
  };

  // Datos de ejemplo para el gráfico de pastel
  const dataPastel = [
    { name: 'Servicio A', value: 200 },
    { name: 'Servicio B', value: 150 },
    { name: 'Servicio C', value: 100 },
    { name: 'Servicio D', value: 50 },
    { name: 'Servicio E', value: 25 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00bcd4'];

  return (
    <div className='mt-4'>
      {/* ComboBox para seleccionar la institución */}
      <Form.Select onChange={handleInstitucionChange} value={selectedInstitucion} label="Institución" className='mb-3'>
        <option value="" disabled>Selecciona una institución</option>
        {instituciones.map((institucion) => (
          <option key={institucion.id} value={institucion.id}>{institucion.nombre}</option>
        ))}
      </Form.Select>

      {/* ComboBox para seleccionar el tipo de gráfico */}
      <Form.Select onChange={handleGraficoTipoChange} value={graficoTipo} label="Tipo de gráfico" className='mb-3'>
        <option value="estadisticas">Estadísticas</option>
        <option value="pastel">Pastel</option>
        <option value="gant">Gant</option>
        <option value="pert">Pert</option>
      </Form.Select>

      {/* Gráfico seleccionado */}
      {graficoTipo === 'estadisticas' && (
        <LineChart width={800} height={400} data={data} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="servicioA" stroke="#8884d8" />
          <Line type="monotone" dataKey="servicioB" stroke="#82ca9d" />
          <Line type="monotone" dataKey="servicioC" stroke="#ffc658" />
          <Line type="monotone" dataKey="servicioD" stroke="#ff7300" />
          <Line type="monotone" dataKey="servicioE" stroke="#00bcd4" />
        </LineChart>
      )}

      {/* Gráfico de pastel */}
      {graficoTipo === 'pastel' && (
        <PieChart width={800} height={400}>
          <Pie
            data={dataPastel}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {dataPastel.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}

      {/* Gráfico de Gant */}
      {graficoTipo === 'gant' && (
        <div>
          {/* Aquí iría el código para el gráfico de Gant */}
        </div>
      )}

      {/* Gráfico de Pert */}
      {graficoTipo === 'pert' && (
        <div>
          {/* Aquí iría el código para el gráfico de Pert */}
        </div>
      )}

      {/* Agregar otros gráficos aquí */}

      {/* Gráfico de top usuarios */}
      <h2>Top 5 usuarios que más registran datos</h2>
      <ul>
        {topUsuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre} - Cantidad: {usuario.cantidad}</li>
        ))}
      </ul>

      {/* Gráfico de top servicios */}
      <h2>Top servicios más adquiridos</h2>
      <ul>
        {topServicios.map((servicio) => (
          <li key={servicio.id}>{servicio.nombre} - Cantidad: {servicio.cantidad}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiciosEstadisticas;
