import Persona_model from "../models/Persona_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_persona = async (req, res) => {
    const persona = await Persona_model.find()
    res.json(persona)
}

// consulta por un registro (por id)
const obtener_persona = async (req, res) => {
    const persona_id = req.params.id; //busca segun el id registrado en la BD
    const persona = await Persona_model.findById(persona_id);

    if (!persona) { // si no existe ese id, envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }
    res.json(persona); //muestra todos los registros
}

// registro de Persona
const registrar_persona = async (req, res) => {

    try {
        const persona_body = new Persona_model(req.body);
        const persona_almacenado = await persona_body.save();
        res.json({ message: "Registro creado", persona_almacenado });

    } catch (error) {
        console.log(error);

        const mensaje_error = 'Ocurrió un error al registrar la Persona';
        res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_persona = async (req, res) => {
    const persona_id = req.params.id;
    const persona = await Persona_model.findById(persona_id);

    if (!persona) res.send("El Registro no se encuentra")
    persona.nombre = req.body.nombre;
    persona.ntelefono = req.body.ntelefono;
    persona.cuilt = req.body.cuilt;
    persona.especialidad = req.body.especialidad;
    persona.dni = req.body.dni;

    try {
        const persona_almacenado = await persona.save();
        res.json({ message: "Registro Modificado", persona_almacenado });
    } catch (error) {
        console.log(error)
    }
}

// elimina por id
const eliminar_persona = async (req, res) => {
    const persona_id = req.params.id;
    const persona = await Persona_model.findById(persona_id)

    if (persona) { // si encuentra el persona (id) -> lo elimina
        persona.deleteOne()
        res.send('Registro eliminado')
    } else { // si no encuentra el persona (id) -> envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }

}


// exports
export {
    listar_persona,
    obtener_persona,
    registrar_persona,
    modificar_persona,
    eliminar_persona
}