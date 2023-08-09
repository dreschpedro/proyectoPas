import Servicio_model from "../models/Servicio_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_servicio = async (req, res) => {
    try {
        const servicio = await Servicio_model.findAll();
        return res.status(200).json(servicio);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener los registros de servicio";
        return res.status(500).json({ error: mensaje_error });
    }
};

// consulta por un registro (por id)
const obtener_servicio = async (req, res) => {
    const servicio_id = req.params.id;
    try {
        const servicio = await Servicio_model.findByPk(servicio_id);

        if (!servicio) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        return res.status(200).json(servicio);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener el registro de servicio";
        return res.status(500).json({ error: mensaje_error });
    }
};

// registro de servicio
const registrar_servicio = async (req, res) => {
    try {
        const servicio_body = req.body;
        console.log(servicio_body)
        const servicio_almacenado = await Servicio_model.create(servicio_body);
        return res.status(200).json({ message: "Registro creado", servicio_almacenado });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al registrar el servicio";
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_servicio = async (req, res) => {
    const servicio_id = req.params.id;
    try {
        const servicio = await Servicio_model.findByPk(servicio_id);

        if (!servicio) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        await servicio.update(req.body);
        return res.status(200).json({ message: "Registro Modificado", servicio });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al modificar el servicio";
        return res.status(500).json({ error: mensaje_error });
    }
};

// elimina por id
const eliminar_servicio = async (req, res) => {
    const servicio_id = req.params.id;
    try {
        const servicio = await Servicio_model.findByPk(servicio_id);

        if (!servicio) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        await servicio.destroy();
        return res.status(200).send("Registro eliminado");
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al eliminar el registro";
        return res.status(500).json({ error: mensaje_error });
    }
};

// exports
export {
    listar_servicio,
    obtener_servicio,
    registrar_servicio,
    modificar_servicio,
    eliminar_servicio
};
