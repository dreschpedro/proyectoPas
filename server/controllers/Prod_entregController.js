import sequelize from '../config/db.js';
import ProdEntreg_model from "../models/ProdEntreg_model.js";
import Producto_model from "../models/Producto_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_prodEnt = async (req, res) => {
  try {
    const prodEnt = await ProdEntreg_model.findAll({
      include: [
        {
          model: Producto_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });
    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const prodEntConProducto = prodEnt.map((prodEntregado) => ({
      ...prodEntregado.get(), // Copiar todos los campos de 'prodEntregado'
      producto: prodEntregado.producto.nombre, // Tomamos solo el nombre de la organización
    }));

    return res.status(200).json(prodEntConProducto);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de prodEnt";
    return res.status(500).json({ error: mensaje_error });
  }
};

// consulta por un registro (por id)
const obtener_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id;

  try {
    const prodEnt = await ProdEntreg_model.findByPk(prodEnt_id, {
      include: [
        {
          model: Producto_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });

    if (!prodEnt) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    // Modificamos la respuesta para reemplazar 'producto' con el nombre
    const prodEntConProducto = {
      ...prodEnt.get(), // Copiamos todos los campos de 'prodEnt'
      producto: prodEnt.producto.nombre, // Reemplazamos 'producto'
    };

    return res.status(200).json(prodEntConProducto);
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al obtener el registro de prodEnt';
    return res.status(500).json({ error: mensaje_error });
  }
};

// registro de prodEnt
const registrar_prodEnt = async (req, res) => {
  try {
    const prodEnt_body = req.body;

    // Obtener el valor máximo actual de id_prod_entreg
    const maxIdResult = await sequelize.query('SELECT MAX(id_prod_entreg) AS max_id FROM prod_entreg', {
      type: sequelize.QueryTypes.SELECT
    });

    const maxId = maxIdResult[0].max_id || 0; // Si no hay registros, establecer a 0

    // Asignar el nuevo id sumando 1 al valor máximo actual
    const nuevoId = maxId + 1;

    // Agregar el nuevo ID al cuerpo de la solicitud
    prodEnt_body.id_prod_entreg = nuevoId;

    const prodEnt_almacenado = await ProdEntreg_model.create(prodEnt_body);
    return res.status(200).json({ message: "Registro creado", prodEnt_almacenado });
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al registrar la prodEnt";
    return res.status(500).json({ error: mensaje_error });
  }
};

// modifica los datos buscando por id
const modificar_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id;
  try {
    const prodEnt = await ProdEntreg_model.findByPk(prodEnt_id);

    if (!prodEnt) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    await prodEnt.update(req.body);
    return res.status(200).json({ message: "Registro Modificado", prodEnt });
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al modificar la prodEnt";
    return res.status(500).json({ error: mensaje_error });
  }
};

// elimina por id
const eliminar_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id;
  try {
    const prodEnt = await ProdEntreg_model.findByPk(prodEnt_id);

    if (!prodEnt) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    await prodEnt.destroy();
    return res.status(200).send("Registro eliminado");
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al eliminar el registro";
    return res.status(500).json({ error: mensaje_error });
  }
};

const cambiar_estado_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id;

  try {
    const prodEnt = await ProdEntreg_model.findByPk(prodEnt_id);

    if (!prodEnt) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    await prodEnt.update({ activo: !prodEnt.activo }); // Cambia el estado activo
    return res.status(200).json({ message: 'Estado modificado', activo: prodEnt.activo });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al cambiar el estado del registro';
    return res.status(500).json({ error: mensaje_error });
  }
};
// exports
export {
  listar_prodEnt,
  obtener_prodEnt,
  registrar_prodEnt,
  modificar_prodEnt,
  eliminar_prodEnt,
  cambiar_estado_prodEnt
};