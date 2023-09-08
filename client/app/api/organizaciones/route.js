// route.js
import { NextResponse } from "next/server";

// Define la URL de la API
const api = 'http://localhost:3005/organizaciones/activo';

// Función para obtener las organizaciones desde la API
export const GET = async () => {
  try {
    const result = await fetch(api, {
      headers: {
        "Content-type": "application/json"
      }
    });

    if (!result.ok) {
      throw new Error(`Error al obtener las organizaciones: ${result.statusText}`);
    }

    const organizaciones = await result.json();
    return organizaciones;
  } catch (error) {
    console.error('Error al obtener la lista de Organizaciones:', error);
    throw error; // Re-lanzamos el error para manejarlo en la página
  }
};


//Crear una organizacion
export const POST = async (req) => {
  const organizacion = await req.json()
  console.log(organizacion);
  const result = await fetch(`${api}/organizaciones/registrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(organizacion)
  })
  const newOrganizacion = await result.json()
  return NextResponse.json({ data: newOrganizacion })
}