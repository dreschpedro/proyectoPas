import UserExt_model from "../models/Uexterno_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_userExt = async (req, res) => {
    const userExt = await UserExt_model.find()
    return res.status(200).json(userExt)
}

// consulta por un registro (por id)
const obtener_userExt = async (req, res) => {
    const userExt_id = req.params.id; //busca segun el id registrado en la BD
    const userExt = await UserExt_model.findById(userExt_id);

    if (!userExt) { // si no existe ese id, envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }
    return res.status(200).json(userExt); //muestra todos los registros
}

// registro de userExt
const registrar_userExt = async (req, res) => {

    try {
        const userExt_body = new UserExt_model(req.body);
        const userExt_almacenado = await userExt_body.save();
        return res.status(200).json({ message: "Registro creado", userExt_almacenado });

    } catch (error) {
        console.log(error);

        const mensaje_error = 'Ocurrió un error al registrar la userExt';
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_userExt = async (req, res) => {
    const userExt_id = req.params.id;
    const userExt = await UserExt_model.findById(userExt_id);

    if (!userExt) res.send("El Registro no se encuentra")
    userExt.nombre = req.body.nombre;
    userExt.cuilt = req.body.cuilt;
    userExt.dni = req.body.dni;
    userExt.domicilio = req.body.domicilio;
    userExt.nDeTelefono = req.body.nDeTelefono;

    try {
        const userExt_almacenado = await userExt.save();
        return res.status(200).json({ message: "Registro Modificado", userExt_almacenado });
    } catch (error) {
        console.log(error)
    }
}

// elimina por id
const eliminar_userExt = async (req, res) => {
    const userExt_id = req.params.id;
    const userExt = await UserExt_model.findById(userExt_id)

    if (userExt) { // si encuentra el userExt (id) -> lo elimina
        userExt.deleteOne()
        return res.status(200).send('Registro eliminado')
    } else { // si no encuentra el userExt (id) -> envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }

}


// exports
export {
    listar_userExt,
    obtener_userExt,
    registrar_userExt,
    modificar_userExt,
    eliminar_userExt
}