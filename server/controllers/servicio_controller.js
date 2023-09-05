import organizacion_model from "../models/Organizacion_model.js";
import Servicio_model from "../models/Servicio_model.js";

// consulta de todos los registros
const listar_servicio = async (req, res) => {
  try {
    const servicios = await Servicio_model.findAll({
      include: [{ model: organizacion_model, attributes: ["id_organizacion", "nombre"] }],
    });
    return res.status(200).json(servicios);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de servicios";
    return res.status(500).json({ error: mensaje_error });
  }
};


//consulta por los servicios activos
const listar_servicio_activo = async (req, res) => {
  try {
    const servicio = await Servicio_model.findAll({
      where: { activo: true },
      include: [{ model: organizacion_model, attributes: ["id_organizacion", "nombre"] }],
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
      },
      include: [
        {
          model: organizacion_model,
          attributes: ["id_organizacion", "nombre"],
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

    return res.status(200).json({ servicio, organizacion });
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

// consulta de servicios por organización
const listar_servicio_por_organizacion = async (req, res) => {
  const organizacion_id = req.params.organizacion_id;

  try {
    const servicios = await Servicio_model.findAll({
      where: {
        activo: true,
        id_organizacion: organizacion_id,
      },
      include: [{ model: organizacion_model, attributes: ["id_organizacion", "nombre"] }],
    });

    return res.status(200).json(servicios);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los servicios de la organización";
    return res.status(500).json({ error: mensaje_error });
  }
};

// exports
export {
  listar_servicio,
  listar_servicio_activo,
  obtener_servicio,
  registrar_servicio,
  modificar_servicio,
  cambiar_estado_servicio,
  listar_servicio_por_organizacion
};
