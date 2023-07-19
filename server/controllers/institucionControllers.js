import inst_model from "../models/Institucion_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_institucion = async (req, res) => {
    try {
        const instituciones = await inst_model.findAll();
        return res.status(200).json(instituciones);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener los registros de institución";
        return res.status(500).json({ error: mensaje_error });
    }
};

// consulta por un registro (por id)
const obtener_institucion = async (req, res) => {
    const institucion_id = req.params.id;
    try {
        const institucion = await inst_model.findByPk(institucion_id);

        if (!institucion) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        return res.status(200).json(institucion);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener el registro de institución";
        return res.status(500).json({ error: mensaje_error });
    }
};

// registro de institución
const registrar_institucion = async (req, res) => {
    try {
        const institucion_body = req.body;
        const institucion_almacenado = await inst_model.create(institucion_body);
        return res.status(200).json({ message: "Institución creada", institucion_almacenado });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al registrar la institución";
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_institucion = async (req, res) => {
    const institucion_id = req.params.id;
    try {
        const institucion = await inst_model.findByPk(institucion_id);

        if (!institucion) {
            const mensaje = "No se encontró la institución solicitada";
            return res.status(404).send(mensaje);
        }

        await institucion.update(req.body);
        return res.status(200).json({ message: "Datos modificados", institucion });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al modificar la institución";
        return res.status(500).json({ error: mensaje_error });
    }
};

// elimina por id
const eliminar_institucion = async (req, res) => {
    const institucion_id = req.params.id;
    try {
        const institucion = await inst_model.findByPk(institucion_id);

        if (!institucion) {
            const mensaje = "No se encontró la institución solicitada";
            return res.status(404).send(mensaje);
        }

        await institucion.destroy();
        return res.status(200).send("Institución eliminada");
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al eliminar la institución";
        return res.status(500).json({ error: mensaje_error });
    }
};

// exports
export {
    listar_institucion,
    obtener_institucion,
    registrar_institucion,
    modificar_institucion,
    eliminar_institucion,
};
