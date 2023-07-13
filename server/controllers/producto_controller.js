import Producto_model from "../models/Producto_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_producto = async (req, res) => {
    const producto = await Producto_model.find()
    return res.status(200).json(producto)
}

// consulta por un registro (por id)
const obtener_producto = async (req, res) => {
    const producto_id = req.params.id; //busca segun el id registrado en la BD
    const producto = await Producto_model.findById(producto_id);

    if (!producto) { // si no existe ese id, envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }
    return res.status(200).json(producto); //muestra todos los registros
}

// registro de producto
const registrar_producto = async (req, res) => {

    try {
        const producto_body = new Producto_model(req.body);
        const producto_almacenado = await producto_body.save();
        return res.status(200).json({ message: "Registro creado", producto_almacenado });

    } catch (error) {
        console.log(error);

        const mensaje_error = 'Ocurrió un error al registrar la producto';
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_producto = async (req, res) => {
    const producto_id = req.params.id;
    const producto = await Producto_model.findById(producto_id);

    if (!producto) res.send("El Registro no se encuentra")
    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    producto.codBarra = req.body.codBarra;
    producto.estEntrega = req.body.estEntrega;
    producto.fechEntrega = req.body.fechEntrega;

    try {
        const producto_almacenado = await producto.save();
        return res.status(200).json({ message: "Registro Modificado", producto_almacenado });
    } catch (error) {
        console.log(error)
    }
}

// elimina por id
const eliminar_producto = async (req, res) => {
    const producto_id = req.params.id;
    const producto = await Producto_model.findById(producto_id)

    if (producto) { // si encuentra el producto (id) -> lo elimina
        producto.deleteOne()
        return res.status(200).send('Registro eliminado')
    } else { // si no encuentra el producto (id) -> envia mensaje de error
        const mensaje = 'No se encontró el registro solicitado';
        return res.status(404).send(mensaje);
    }

}


// exports
export {
    listar_producto,
    obtener_producto,
    registrar_producto,
    modificar_producto,
    eliminar_producto
}