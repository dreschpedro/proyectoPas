import operativo_model from "../models/Operativo_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_operativo = async (req, res) => {
    const operativo = await operativo_model.find()
    return res.status(200).json(operativo)
}

// consulta por un registro (por id)
const obtener_operativo = async (req, res) => {
    const operativo_id = req.params.id; //busca segun el id registrado en la BD
    const operativo = await operativo_model.findById(operativo_id);

    if (!operativo) { // si no existe ese id, envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }
    return res.status(200).json(operativo); //muestra todos los registros
}

// registro de operativo
const registrar_operativo = async (req, res) => {

    try {
        const operativo_body = new operativo_model(req.body);
        const operativo_almacenado = await operativo_body.save();
        return res.status(200).json({ message: "Registro creado!", operativo_almacenado });

    } catch (error) {
        console.log(error);

        const mensaje_error = 'Ocurrió un error al registrar el operativo';
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_operativo = async (req, res) => {
    const operativo_id = req.params.id;
    const operativo = await operativo_model.findById(operativo_id);

    if (!operativo) res.send("El operativo no se encuentra")
    operativo.nombre = req.body.nombre;
    operativo.ntelefono = req.body.ntelefono;
    operativo.cuilt = req.body.cuilt;
    operativo.especialidad = req.body.especialidad;
    operativo.dni = req.body.dni;

    try {
        const operativo_almacenado = await operativo.save();
        return res.status(200).json({ message: "Registro modificado", operativo_almacenado });
    } catch (error) {
        console.log(error)
    }
}

// elimina por id
const eliminar_operativo = async (req, res) => {
    const operativo_id = req.params.id;
    const operativo = await operativo_model.findById(operativo_id)

    if (operativo) { // si encuentra el operativo (id) -> lo elimina
        operativo.deleteOne()
        return res.status(200).send('operativo eliminado')
    } else { // si no encuentra el operativo (id) -> envia mensaje de error
        const mensaje = 'No se encontró el operativo solicitado';
        return res.status(404).send(mensaje);
    }

}


// exports
export {
    listar_operativo,
    obtener_operativo,
    registrar_operativo,
    modificar_operativo,
    eliminar_operativo
}