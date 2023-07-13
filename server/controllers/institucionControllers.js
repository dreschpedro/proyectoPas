import inst_model from "../models/Institucion_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_institucion = async (req, res) => {
    const institucion = await inst_model.find()
    return res.status(200).json(institucion)
}

// consulta por un registro (por id)
const obtener_institucion = async (req, res) => {
    const institucion_id = req.params.id; //busca segun el id registrado en la BD
    const institucion = await inst_model.findById(institucion_id);

    if (!institucion) { // si no existe ese id, envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }
    return res.status(200).json(institucion); //muestra todos los registros
}

// registro de institucion
const registrar_institucion = async (req, res) => {

    try {
        const institucion_body = new inst_model(req.body);
        const institucion_almacenado = await institucion_body.save();
        return res.status(200).json({ message: "Institucion creada", institucion_almacenado });

    } catch (error) {
        console.log(error);

        const mensaje_error = 'Ocurrió un error al registrar la Institución';
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_institucion = async (req, res) => {
    const institucion_id = req.params.id;
    const institucion = await inst_model.findById(institucion_id);

    if (!institucion) res.send("La Institución no se encuentra")
    institucion.nombre = req.body.nombre;
    institucion.encargado = req.body.encargado;

    try {
        const institucion_almacenado = await institucion.save();
        return res.status(200).json({ message: "Datos modificados", institucion_almacenado });
    } catch (error) {
        console.log(error)
    }
}

// elimina por id
const eliminar_institucion = async (req, res) => {
    const institucion_id = req.params.id;
    const institucion = await inst_model.findById(institucion_id)

    if (institucion) { // si encuentra la institucion (id) -> lo elimina
        institucion.deleteOne()
        return res.status(200).send('Institucion eliminada');
    } else { // si no encuentra el institucion (id) -> envia mensaje de error
        const mensaje = 'No se encontró el Institucion solicitada';
        return res.status(404).send(mensaje);
    }

}


// exports
export {
    listar_institucion,
    obtener_institucion,
    registrar_institucion,
    modificar_institucion,
    eliminar_institucion
}