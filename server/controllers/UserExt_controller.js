import UserExt_model from "../models/Uexterno_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_userExt = async (req, res) => {
    try {
        const userExt = await UserExt_model.findAll();
        return res.status(200).json(userExt);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener los registros de usuario externo";
        return res.status(500).json({ error: mensaje_error });
    }
};

// consulta por un registro (por id)
const obtener_userExt = async (req, res) => {
    const userExt_id = req.params.id;
    try {
        const userExt = await UserExt_model.findByPk(userExt_id);

        if (!userExt) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        return res.status(200).json(userExt);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener el registro de usuario externo";
        return res.status(500).json({ error: mensaje_error });
    }
};

// registro de userExt
const registrar_userExt = async (req, res) => {
    try {
        const userExt_body = req.body;
        const userExt_almacenado = await UserExt_model.create(userExt_body);
        return res.status(200).json({ message: "Registro creado", userExt_almacenado });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al registrar el usuario externo";
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_userExt = async (req, res) => {
    const userExt_id = req.params.id;
    try {
        const userExt = await UserExt_model.findByPk(userExt_id);

        if (!userExt) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        await userExt.update(req.body);
        return res.status(200).json({ message: "Registro Modificado", userExt });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al modificar el usuario externo";
        return res.status(500).json({ error: mensaje_error });
    }
};

// elimina por id
const eliminar_userExt = async (req, res) => {
    const userExt_id = req.params.id;
    try {
        const userExt = await UserExt_model.findByPk(userExt_id);

        if (!userExt) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        await userExt.destroy();
        return res.status(200).send("Registro eliminado");
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al eliminar el registro";
        return res.status(500).json({ error: mensaje_error });
    }
};

// exports
export {
    listar_userExt,
    obtener_userExt,
    registrar_userExt,
    modificar_userExt,
    eliminar_userExt
};
