import Producto_model from "../models/Producto_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_producto = async (req, res) => {
    try {
        const producto = await Producto_model.findAll();
        return res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener los registros de producto";
        return res.status(500).json({ error: mensaje_error });
    }
};

// consulta por un registro (por id)
const obtener_producto = async (req, res) => {
    const producto_id = req.params.id;
    try {
        const producto = await Producto_model.findByPk(producto_id);

        if (!producto) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        return res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al obtener el registro de producto";
        return res.status(500).json({ error: mensaje_error });
    }
};

// registro de producto
const registrar_producto = async (req, res) => {
    try {
        const producto_body = req.body;
        const producto_almacenado = await Producto_model.create(producto_body);
        return res.status(200).json({ message: "Registro creado", producto_almacenado });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al registrar el producto";
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_producto = async (req, res) => {
    const producto_id = req.params.id;
    try {
        const producto = await Producto_model.findByPk(producto_id);

        if (!producto) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        await producto.update(req.body);
        return res.status(200).json({ message: "Registro Modificado", producto });
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al modificar el producto";
        return res.status(500).json({ error: mensaje_error });
    }
};

// elimina por id
const eliminar_producto = async (req, res) => {
    const producto_id = req.params.id;
    try {
        const producto = await Producto_model.findByPk(producto_id);

        if (!producto) {
            const mensaje = "No se encontró el registro solicitado";
            return res.status(404).send(mensaje);
        }

        await producto.destroy();
        return res.status(200).send("Registro eliminado");
    } catch (error) {
        console.log(error);
        const mensaje_error = "Ocurrió un error al eliminar el registro";
        return res.status(500).json({ error: mensaje_error });
    }
};

// exports
export {
    listar_producto,
    obtener_producto,
    registrar_producto,
    modificar_producto,
    eliminar_producto
};
