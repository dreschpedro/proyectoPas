import { NextResponse } from "next/server";
//Traer todos los productos



const ruta = `http://localhost:3005/api/producto`

export const GET = async () => {    
    const result = await fetch(`${ruta}/activo`,{        
        headers: {
            "Content-type": "application/json"
        }
    })
    const products =  await result.json()
    // const resultArray = await result
    // console.log('los products')
    // console.log(products)
    // const organizationData = products.map(product => product.organizacion)
    // console.log(organizationData)
    // console.log(resultArray)
    
    return products
    // return NextResponse.json({data:products})
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