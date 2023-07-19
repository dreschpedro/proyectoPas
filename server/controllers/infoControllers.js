import InfoSA_model from "../models/InfoSASocAmbient_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_infoSA = async (req, res) => {
    const infoSA = await InfoSA_model.find()
    return res.status(200).json(infoSA)
}

// consulta por un registro (por id)
const obtener_infoSA = async (req, res) => {
    const infoSA_id = req.params.id; //busca segun el id registrado en la BD
    const infoSA = await InfoSA_model.findById(infoSA_id);

    if (!infoSA) { // si no existe ese id, envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }
    return res.status(200).json(infoSA); //muestra todos los registros
}

// registro de infoSA
const registrar_infoSA = async (req, res) => {

    try {
        const infoSA_body = new InfoSA_model(req.body);
        const infoSA_almacenado = await infoSA_body.save();
        return res.status(200).json({ message: "Registro creado!", infoSA_almacenado });

    } catch (error) {
        console.log(error);

        const mensaje_error = 'Ocurrió un error al registrar el infoSA';
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_infoSA = async (req, res) => {
    const infoSA_id = req.params.id;
    const infoSA = await InfoSA_model.findById(infoSA_id);

    if (!infoSA) res.send("El infoSA no se encuentra")
    infoSA.nombre = req.body.nombre;
    infoSA.ntelefono = req.body.ntelefono;
    infoSA.cuilt = req.body.cuilt;
    infoSA.especialidad = req.body.especialidad;
    infoSA.dni = req.body.dni;

    try {
        const infoSA_almacenado = await infoSA.save();
        return res.status(200).json({ message: "Registro modificado", infoSA_almacenado });
    } catch (error) {
        console.log(error)
    }
}

// elimina por id
const eliminar_infoSA = async (req, res) => {
    const infoSA_id = req.params.id;
    const infoSA = await InfoSA_model.findById(infoSA_id)

    if (infoSA) { // si encuentra el infoSA (id) -> lo elimina
        infoSA.deleteOne()
        return res.status(200).send('infoSA eliminado')
    } else { // si no encuentra el infoSA (id) -> envia mensaje de error
        const mensaje = 'No se encontró el infoSA solicitado';
        return res.status(404).send(mensaje);
    }

}


// exports
export {
    listar_infoSA,
    obtener_infoSA,
    registrar_infoSA,
    modificar_infoSA,
    eliminar_infoSA
}