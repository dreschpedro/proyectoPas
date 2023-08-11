import organizacion_model from "../models/Organizacion_model.js";
import Servicio_model from "../models/Servicio_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_servicio = async (req, res) => {
  try {
    const servicio = await Servicio_model.findAll({
      where: { activo: true },
      include: [{ model: organizacion_model, attributes: ["nombre"] }],
    });
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
    const servicio = await Servicio_model.findOne({
      where: {
        id_servicio: servicio_id,
        activo: true
      }, // Agregar condición de activo: true
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"],
        },
      ],
    });

    // Corrige la consulta para obtener la organización
    const organizacion = await organizacion_model.findByPk(servicio.id_organizacion, {
      attributes: ["nombre"],
    });

    if (!servicio) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    return res.status(200).json({ servicio, organizacion }); // Devuelve también la organización
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al obtener el registro de servicio';
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

//cambia el estado del atributo "activo"
const cambiar_estado_servicio = async (req, res) => {
  const servicio_id = req.params.id;

  try {
    const servicio = await Servicio_model.findByPk(servicio_id);

    if (!servicio) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    await servicio.update({ activo: !servicio.activo }); // Cambia el estado activo
    return res.status(200).json({ message: 'Estado modificado', activo: servicio.activo });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al cambiar el estado del registro';
    return res.status(500).json({ error: mensaje_error });
  }
};

// exports
export {
  listar_servicio,
  obtener_servicio,
  registrar_servicio,
  modificar_servicio,
  cambiar_estado_servicio
};
