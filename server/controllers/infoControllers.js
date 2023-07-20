import InfoSA_model from "../models/InfoSocAmbient_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_infoSA = async (req, res) => {
    try {
        const infoSA = await InfoSA_model.findAll();
        return res.status(200).json(infoSA);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener los registros de infoSA";
        return res.status(500).json({ error: mensaje_error });
    }
};

// consulta por un registro (por id)
const obtener_infoSA = async (req, res) => {
    const infoSA_id = req.params.id;

    try {
        const infoSA = await InfoSA_model.findByPk(infoSA_id);

        if (!infoSA) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        return res.status(200).json(infoSA);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener el registro de infoSA";
        return res.status(500).json({ error: mensaje_error });
    }
};

// registro de infoSA
const registrar_infoSA = async (req, res) => {
    try {
        const infoSA_body = req.body;
        const infoSA_almacenado = await InfoSA_model.create(infoSA_body);
        return res
            .status(200)
            .json({ message: "Registro creado!", infoSA_almacenado });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al registrar el infoSA";
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_infoSA = async (req, res) => {
    const infoSA_id = req.params.id;

    try {
        const infoSA = await InfoSA_model.findByPk(infoSA_id);

        if (!infoSA) {
            return res.status(404).send("El infoSA no se encuentra");
        }

        await infoSA.update(req.body);
        return res.status(200).json({ message: "Registro modificado", infoSA });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al modificar el infoSA";
        return res.status(500).json({ error: mensaje_error });
    }
};

// elimina por id
const eliminar_infoSA = async (req, res) => {
    const infoSA_id = req.params.id;

    try {
        const infoSA = await InfoSA_model.findByPk(infoSA_id);

        if (!infoSA) {
            const mensaje = "No se encontró el infoSA solicitado";
            return res.status(404).send(mensaje);
        }

        await infoSA.destroy();
        return res.status(200).send("infoSA eliminado");
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al eliminar el infoSA";
        return res.status(500).json({ error: mensaje_error });
    }
};

// exports
export {
    listar_infoSA,
    obtener_infoSA,
    registrar_infoSA,
    modificar_infoSA,
    eliminar_infoSA,
};
