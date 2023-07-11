import Persona from "../models/Persona.js" // es necesario instanciar modelo Personas para registrar Personas

// consulta de todos los registros
const listaPersonas= async (req,res)=>{
    const persona = await Persona.find()
    res.json(persona)
  }
// consulta por id
const obtenerPersona= async (req,res)=>{
    const persona = await Persona.findById(req.params.id)
    res.json(persona)
}

const registrarPersona= async (req,res)=>{
    const persona = new Persona(req.body) // registro un Persona

    try {
        const personaAlmacenado = await Persona.save();
        res.json(personaAlmacenado)
    } catch (error) {
        console.log(error)
    }
}
//modificar registro
const modificarPersona= async (req,res)=>{
    const persona = await Persona.findById(req.params.id)

    if (!persona) res.send ("el Persona no se encuentra")
    Persona.nombre=req.body.nombre;
    Persona.cuilt=req.body.cuilt;
    Persona.dni=req.body.dni;
    Persona.domicilio=req.body.domicilio;
    Persona.nDeTelefono=req.body.nDeTelefono;
    
    try {
        const personaAlmacenado = await Persona.save();
        res.json(personaAlmacenado)
    } catch (error) {
        console.log(error)
    }
    res.json(Persona)
}

const eliminarPersona= async (req,res)=>{
    const Persona = await Persona.findById(req.params.id)
    Persona.deleteOne()
    res.send('Persona eliminado')

}

export {
    listaPersonas,
    obtenerPersona,
    registrarPersona,
    modificarPersona,
    eliminarPersona,
}