import Producto_model from "../models/Producto_model.js";
import organizacion_model from "../models/Organizacion_model.js";

// consulta de todos los registros
const listar_productos = async (req, res) => {
  try {
    const productoss = await Producto_model.findAll({
      include: [{ model: organizacion_model, attributes: ["id_organizacion", "nombre"] }],
    });
    return res.status(200).json(productoss);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de productoss";
    return res.status(500).json({ error: mensaje_error });
  }
};

//consulta por los productoss activos
const listar_producto_activo = async (req, res) => {
  try {
    const producto = await Producto_model.findAll({
      where: { activo: true },
      include: [{ model: organizacion_model, attributes: ["id_organizacion", "nombre"] }],
    });
    return res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de producto";
    return res.status(500).json({ error: mensaje_error });
  }
};

const listar_producto_por_organizacion = async (req, res) => {
  const organizacion_id = req.params.organizacion_id;

  try {
    const productos = await Producto_model.findAll({
      where: {
        activo: true,
        id_organizacion: organizacion_id,
      },
      include: [{ model: organizacion_model, attributes: ["id_organizacion", "nombre"] }],
    });

    return res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los productos de la organización";
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

const cambiar_estado_producto = async (req, res) => {
  const producto_id = req.params.id;

  try {
    const producto = await Producto_model.findByPk(producto_id);

    if (!producto) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    await producto.update({ activo: !producto.activo }); // Cambia el estado activo
    return res.status(200).json({ message: 'Estado modificado', activo: producto.activo });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al cambiar el estado del registro';
    return res.status(500).json({ error: mensaje_error });
  }
};

// exports
export {
  listar_productos,
  listar_producto_activo,
  listar_producto_por_organizacion,
  obtener_producto,
  registrar_producto,
  modificar_producto,
  cambiar_estado_producto
};
