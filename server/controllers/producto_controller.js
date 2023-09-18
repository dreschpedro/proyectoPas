import Producto_model from "../models/Producto_model.js";
import organizacion_model from "../models/Organizacion_model.js";
import sequelize from '../config/db.js';

// consulta de todos los registros
const listar_productos = async (req, res) => {
  try {
    const productos = await Producto_model.findAll({
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });
    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const productosConOrganizacion = productos.map((producto) => ({
      ...producto.get(), // Copiar todos los campos de 'producto'
      organizacion: producto.organizacion.nombre, // Tomamos solo el nombre de la organización
    }));

    return res.status(200).json(productosConOrganizacion);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de productos";
    return res.status(500).json({ error: mensaje_error });
  }
};

//consulta por los productoss activos
const listar_producto_activo = async (req, res) => {
  try {
    const producto = await Producto_model.findAll({
      where: { activo: true },
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });
    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const productosConOrganizacion = producto.map((producto) => ({
      ...producto.get(), // Copiar todos los campos de 'producto'
      organizacion: producto.organizacion.nombre, // Tomamos solo el nombre de la organización
    }));

    return res.status(200).json(productosConOrganizacion);
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
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });

    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const productosConOrganizacion = productos.map((producto) => ({
      ...producto.get(), // Copiar todos los campos de 'producto'
      organizacion: producto.organizacion.nombre, // Tomamos solo el nombre de la organización
    }));

    return res.status(200).json(productosConOrganizacion);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los productos de la organización";
    return res.status(500).json({ error: mensaje_error });
  }
};

const listar_producto_pas_completo = async (req, res) => {
  try {
    const producto = await Producto_model.findAll({
      where: { activo: true },
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });

    // Filtrar las organizaciones que no se llamen "vicegobernacion"
    const productosFiltrados = producto.filter((producto) => {
      const organizacionNombre = producto.organizacion.nombre;
      return organizacionNombre.toLowerCase() !== "vicegobernacion";
    });

    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const productosConOrganizacion = productosFiltrados.map((producto) => ({
      ...producto.get(), // Copiar todos los campos de 'producto'
      organizacion: producto.organizacion.nombre, // Tomamos solo el nombre de la organización
    }));

    return res.status(200).json(productosConOrganizacion);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de productos";
    return res.status(500).json({ error: mensaje_error });
  }
};

// consulta por un registro (por id)
const obtener_producto = async (req, res) => {
  const producto_id = req.params.id;
  try {
    const producto = await Producto_model.findByPk(producto_id, {
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });

    if (!producto) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    // Modificamos la respuesta para reemplazar 'organizacion' con el nombre
    const productoConNombreOrganizacion = {
      ...producto.get(), // Copiamos todos los campos de 'producto'
      organizacion: producto.organizacion.nombre, // Reemplazamos 'organizacion'
    };

    return res.status(200).json(productoConNombreOrganizacion);
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

    // Obtener el valor máximo actual de id_producto
    const maxIdResult = await sequelize.query('SELECT MAX(id_producto) AS max_id FROM producto', {
      type: sequelize.QueryTypes.SELECT
    });

    const maxId = maxIdResult[0].max_id || 0; // Si no hay registros, establecer a 0

    // Asignar el nuevo id sumando 1 al valor máximo actual
    const nuevoId = maxId + 1;

    // Crear el producto con el nuevo id
    const producto_almacenado = await Producto_model.create({
      id_producto: nuevoId, // Asegúrate de que el modelo tenga una propiedad id_producto
      ...producto_body // Copiar el resto de las propiedades desde el cuerpo de la solicitud
    });

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
  listar_producto_pas_completo,
  listar_producto_por_organizacion,
  obtener_producto,
  registrar_producto,
  modificar_producto,
  cambiar_estado_producto
};
