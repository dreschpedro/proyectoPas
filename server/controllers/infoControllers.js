import Info_model from "../models/Info_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_info = async (req, res) => {
    const info = await Info_model.find()
    res.json(info)
}

// consulta por un registro (por id)
const obtener_info = async (req, res) => {
    const info_id = req.params.id; //busca segun el id registrado en la BD
    const info = await Info_model.findById(info_id);

    if (!info) { // si no existe ese id, envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }
    res.json(info); //muestra todos los registros
}

// registro de info
const registrar_info = async (req, res) => {

    try {
        const info_body = new Info_model(req.body);
        const info_almacenado = await info_body.save();
        res.json({ message: "Registro creado!", info_almacenado });

    } catch (error) {
        console.log(error);

        const mensaje_error = 'Ocurrió un error al registrar el info';
        res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_info = async (req, res) => {
    const info_id = req.params.id;
    const info = await Info_model.findById(info_id);

    if (!info) res.send("El info no se encuentra")
    info.nombre = req.body.nombre;
    info.ntelefono = req.body.ntelefono;
    info.cuilt = req.body.cuilt;
    info.especialidad = req.body.especialidad;
    info.dni = req.body.dni;

    try {
        const info_almacenado = await info.save();
        res.json({ message: "registro modificado", info_almacenado });
    } catch (error) {
        console.log(error)
    }
}

// elimina por id
const eliminar_info = async (req, res) => {
    const info_id = req.params.id;
    const info = await Info_model.findById(info_id)

    if (info) { // si encuentra el info (id) -> lo elimina
        info.deleteOne()
        res.send('info eliminado')
    } else { // si no encuentra el info (id) -> envia mensaje de error
        const mensaje = 'No se encontró el info solicitado';
        return res.status(404).send(mensaje);
    }

}


// exports
export {
    listar_info,
    obtener_info,
    registrar_info,
    modificar_info,
    eliminar_info
}