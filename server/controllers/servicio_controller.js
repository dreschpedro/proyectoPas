import Servicio_model from "../models/Servicio_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_servicio = async (req, res) => {
    const servicio = await Servicio_model.find()
    res.json(servicio)
}

// consulta por un registro (por id)
const obtener_servicio = async (req, res) => {
    const servicio_id = req.params.id; //busca segun el id registrado en la BD
    const servicio = await Servicio_model.findById(servicio_id);

    if (!servicio) { // si no existe ese id, envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }
    res.json(servicio); //muestra todos los registros
}

// registro de servicio
const registrar_servicio = async (req, res) => {

    try {
        const servicio_body = new Servicio_model(req.body);
        const servicio_almacenado = await servicio_body.save();
        res.json({ message: "Registro creado", servicio_almacenado });

    } catch (error) {
        console.log(error);

        const mensaje_error = 'Ocurrió un error al registrar la servicio';
        res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_servicio = async (req, res) => {
    const servicio_id = req.params.id;
    const servicio = await Servicio_model.findById(servicio_id);

    if (!servicio) res.send("El Registro no se encuentra")
    servicio.nombre = req.body.nombre;
    servicio.precio = req.body.precio;
    servicio.codBarra = req.body.codBarra;
    servicio.estEntrega = req.body.estEntrega;
    servicio.fechEntrega = req.body.fechEntrega;

    try {
        const servicio_almacenado = await servicio.save();
        res.json({ message: "Registro Modificado", servicio_almacenado });
    } catch (error) {
        console.log(error)
    }
}

// elimina por id
const eliminar_servicio = async (req, res) => {
    const servicio_id = req.params.id;
    const servicio = await Servicio_model.findById(servicio_id)

    if (servicio) { // si encuentra el servicio (id) -> lo elimina
        servicio.deleteOne()
        res.send('Registro eliminado')
    } else { // si no encuentra el servicio (id) -> envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }

}


// exports
export {
    listar_servicio,
    obtener_servicio,
    registrar_servicio,
    modificar_servicio,
    eliminar_servicio
}