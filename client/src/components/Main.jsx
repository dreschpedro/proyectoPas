import axios from "axios";
import React, { useState, useEffect } from "react";

const baseURL = "http://localhost:3005/api/personal";

export default function App() {
  const [personal, setPersonal] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setPersonal(response.data);
    });
  }, []);

  function registrarPersonal() {
    const nuevoPersonal = {
      nombre: "John Doe",
      ntelefono: "123456789",
      cuilt: "12345678901",
      especialidad: "Medicina",
      dni: "987654321",
      activo: true
    };

    axios.post(`${baseURL}/registrar`, nuevoPersonal).then((response) => {
      console.log(response.data);
    });
  }

  if (!personal) return "No personal!";

  return (
    <div>
      <h1>Personal</h1>
      {personal.map((p) => (
        <div key={p._id}>
          <h3>{p.nombre}</h3>
          <p>Telefono: {p.ntelefono}</p>
          <p>CUIL: {p.cuilt}</p>
          <p>Especialidad: {p.especialidad}</p>
          <p>DNI: {p.dni}</p>
          <p>Activo: {p.activo ? "Sí" : "No"}</p>
          <hr />
        </div>
      ))}
      <button onClick={registrarPersonal}>Registrar Personal</button>
    </div>
  );
}
