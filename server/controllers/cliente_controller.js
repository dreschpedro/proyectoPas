import Cliente_model from "../models/Cliente_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_cliente = async (req, res) => {
    try {
        const cliente = await Cliente_model.findAll();
        return res.status(200).json(cliente);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener los registros de usuario externo";
        return res.status(500).json({ error: mensaje_error });
    }
};

// consulta por un registro (por id)
const obtener_cliente = async (req, res) => {
    const cliente_id = req.params.id;
    try {
        const cliente = await Cliente_model.findByPk(cliente_id);

        if (!cliente) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        return res.status(200).json(cliente);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener el registro de usuario externo";
        return res.status(500).json({ error: mensaje_error });
    }
};

// registro de cliente
const registrar_cliente = async (req, res) => {
    try {
        const cliente_body = req.body;
        const cliente_almacenado = await Cliente_model.create(cliente_body);
        return res.status(200).json({ message: "Registro creado", cliente_almacenado });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al registrar el usuario externo";
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_cliente = async (req, res) => {
    const cliente_id = req.params.id;
    try {
        const cliente = await Cliente_model.findByPk(cliente_id);

        if (!cliente) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        await cliente.update(req.body);
        return res.status(200).json({ message: "Registro Modificado", cliente });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al modificar el usuario externo";
        return res.status(500).json({ error: mensaje_error });
    }
};

// elimina por id
const eliminar_cliente = async (req, res) => {
    const cliente_id = req.params.id;
    try {
        const cliente = await Cliente_model.findByPk(cliente_id);

        if (!cliente) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        await cliente.destroy();
        return res.status(200).send("Registro eliminado");
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al eliminar el registro";
        return res.status(500).json({ error: mensaje_error });
    }
};

// exports
export {
    listar_cliente,
    obtener_cliente,
    registrar_cliente,
    modificar_cliente,
    eliminar_cliente
};
