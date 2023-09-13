import { NextResponse } from "next/server";
//Traer todos los productos



// Función para obtener las productos desde la API
export const GET = async (api) => {
    try {
      const result = await fetch(api, {
        headers: {
          "Content-type": "application/json"
        }
      });
  
      if (!result.ok) {
        throw new Error(`Error al obtener las productos: ${result.statusText}`);
      }
  
      const datos = await result.json();
      console.log('aca estan los datos de los', datos);
      return datos;
      
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      throw error; // Re-lanzamos el error para manejarlo en la página
    }
  };
  
//Crear un producto
export const POST = async (req)=>{
    const product = await req.json()
    console.log(product);
    const result = await fetch(`${ruta}/registrar`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",      
        },
        body: JSON.stringify(product)
    })
    const newProduct = await result.json()
    return NextResponse.json({data: newProduct})
}