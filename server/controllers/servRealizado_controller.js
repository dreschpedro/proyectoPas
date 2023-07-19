import ServRealizado_model from "../models/ServRealizado_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_servReal = async (req, res) => {
    const servReal = await ServRealizado_model.find()
    return res.status(200).json(servReal)
}

// consulta por un registro (por id)
const obtener_servReal = async (req, res) => {
    const servReal_id = req.params.id; //busca segun el id registrado en la BD
    const servReal = await ServRealizado_model.findById(servReal_id);

    if (!servReal) { // si no existe ese id, envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }
    return res.status(200).json(servReal); //muestra todos los registros
}

// registro de servReal
const registrar_servReal = async (req, res) => {

    try {
        const servReal_body = new ServRealizado_model(req.body);
        const servReal_almacenado = await servReal_body.save();
        return res.status(200).json({ message: "Registro creado!", servReal_almacenado });

    } catch (error) {
        console.log(error);

        const mensaje_error = 'Ocurrió un error al registrar el servReal';
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_servReal = async (req, res) => {
    const servReal_id = req.params.id;
    const servReal = await ServRealizado_model.findById(servReal_id);

    if (!servReal) res.send("El servReal no se encuentra")
    servReal.nombre = req.body.nombre;
    servReal.ntelefono = req.body.ntelefono;
    servReal.cuilt = req.body.cuilt;
    servReal.especialidad = req.body.especialidad;
    servReal.dni = req.body.dni;

    try {
        const servReal_almacenado = await servReal.save();
        return res.status(200).json({ message: "Registro modificado", servReal_almacenado });
    } catch (error) {
        console.log(error)
    }
}

// elimina por id
const eliminar_servReal = async (req, res) => {
    const servReal_id = req.params.id;
    const servReal = await ServRealizado_model.findById(servReal_id)

    if (servReal) { // si encuentra el servReal (id) -> lo elimina
        servReal.deleteOne()
        return res.status(200).send('servReal eliminado')
    } else { // si no encuentra el servReal (id) -> envia mensaje de error
        const mensaje = 'No se encontró el servReal solicitado';
        return res.status(404).send(mensaje);
    }

}


// exports
export {
    listar_servReal,
    obtener_servReal,
    registrar_servReal,
    modificar_servReal,
    eliminar_servReal
}