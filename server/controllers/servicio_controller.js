import organizacion_model from "../models/Organizacion_model.js";
import sequelize from '../config/db.js';
import Servicio_model from "../models/Servicio_model.js";

// consulta de todos los registros
const listar_servicio = async (req, res) => {
  try {
    const servicios = await Servicio_model.findAll({
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });
    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const serviciosConOrganizacion = servicios.map((servicio) => ({
      ...servicio.get(), // Copiar todos los campos de 'servicio'
      organizacion: servicio.organizacion.nombre, // Tomamos solo el nombre de la organización
    }));

    return res.status(200).json(serviciosConOrganizacion);
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
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });
    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const serviciosConOrganizacion = servicio.map((servicio) => ({
      ...servicio.get(), // Copiar todos los campos de 'servicio'
      organizacion: servicio.organizacion.nombre, // Tomamos solo el nombre de la organización
    }));

    return res.status(200).json(serviciosConOrganizacion);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de servicio";
    return res.status(500).json({ error: mensaje_error });
  }
};


const listar_servicio_pas_completo = async (req, res) => {
  try {
    const servicio = await Servicio_model.findAll({
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
    const serviciosFiltrados = servicio.filter((servicio) => {
      const organizacionNombre = servicio.organizacion.nombre;
      return organizacionNombre.toLowerCase() !== "vicegobernacion";
    });

    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const serviciosConOrganizacion = serviciosFiltrados.map((servicio) => ({
      ...servicio.get(), // Copiar todos los campos de 'servicio'
      organizacion: servicio.organizacion.nombre, // Tomamos solo el nombre de la organización
    }));

    return res.status(200).json(serviciosConOrganizacion);
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
    const servicio = await Servicio_model.findByPk(servicio_id, {
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
      ],
    });

    if (!servicio) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    // Modificamos la respuesta para reemplazar 'organizacion' con el nombre
    const servicioConNombreOrganizacion = {
      ...servicio.get(), // Copiamos todos los campos de 'servicio'
      organizacion: servicio.organizacion.nombre, // Reemplazamos 'organizacion'
    };

    return res.status(200).json(servicioConNombreOrganizacion);
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

    // Obtener el valor máximo actual de id_servicio
    const maxIdResult = await sequelize.query('SELECT MAX(id_servicio) AS max_id FROM servicio', {
      type: sequelize.QueryTypes.SELECT
    });

    const maxId = maxIdResult[0].max_id || 0; // Si no hay registros, establecer a 0

    // Asignar el nuevo id sumando 1 al valor máximo actual
    const nuevoId = maxId + 1;

    // Asignar el nuevo ID al servicio
    servicio_body.id_servicio = nuevoId;

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
  listar_servicio_pas_completo,
  obtener_servicio,
  registrar_servicio,
  modificar_servicio,
  cambiar_estado_servicio,
  listar_servicio_por_organizacion
};
