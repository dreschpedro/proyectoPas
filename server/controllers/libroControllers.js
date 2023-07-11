import Libro from "../models/Servicio.js" // es necesario instanciar modelo Libros para registrar libros

// consulta de todos los registros
const listaLibros= async (req,res)=>{
    const libro = await Libro.find()
    res.json(libro)
  }
// consulta por id
const obtenerLibro= async (req,res)=>{
    const libro = await Libro.findById(req.params.id)
    res.json(libro)
}

const registrarLibro= async (req,res)=>{
    const libro = new Libro(req.body) // registro un libro

    try {
        const libroAlmacenado = await libro.save();
        res.json(libroAlmacenado)
    } catch (error) {
        console.log(error)
    }
}
//modificar registro
const modificarLibro= async (req,res)=>{
    const libro = await Libro.findById(req.params.id)

    if (!libro) res.send ("el libro no se encuentra")
    libro.nombre=req.body.nombre;
    libro.autor=req.body.autor;
    
    try {
        const libroAlmacenado = await libro.save();
        res.json(libroAlmacenado)
    } catch (error) {
        console.log(error)
    }
    res.json(libro)
}

const eliminarLibro= async (req,res)=>{
    const libro = await Libro.findById(req.params.id)
    libro.deleteOne()
    res.send('Libro eliminado')

}

export {
    listaLibros,
    obtenerLibro,
    registrarLibro,
    modificarLibro,
    eliminarLibro,
}