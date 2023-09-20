import organizacion_model from "../models/Organizacion_model.js";
import sequelize from '../config/db.js';
import { getDefaultImagePath, saveImageAndGetPath, deleteTempImage } from '../helpers/imagen.js';

// FUNCIONALIDADES
// consulta de todos los registros
const listar_organizacion = async (req, res) => {
  try {
    const organizaciones = await organizacion_model.findAll();
    return res.status(200).json(organizaciones);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de organizacion";
    return res.status(500).json({ error: mensaje_error });
  }
};

const listar_organizacion_activo = async (req, res) => {
  try {
    const organizacion = await organizacion_model.findAll({
      where: { activo: true }
    });
    return res.status(200).json(organizacion);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de organizacion";
    return res.status(500).json({ error: mensaje_error });
  }
};

// consulta por un registro (por id)
const obtener_organizacion = async (req, res) => {
  const organizacion_id = req.params.id;
  try {
    const organizacion = await organizacion_model.findByPk(organizacion_id);

    if (!organizacion) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    return res.status(200).json(organizacion); // Devuelve el objeto "organizacion" sin cambios
  } catch (error) {
    console.error('Error al obtener la organizacion:', error);
    const mensaje_error = 'Ocurrió un error al obtener la organizacion';
    return res.status(500).json({ error: mensaje_error });
  }
};

// Registrar una organización
const registrar_organizacion = async (req, res) => {
  try {
    // Obtener los datos de la organización del cuerpo de la solicitud
    const { nombre, direccion, telefono, email, descripcion } = req.body;

    // Verificar que los campos obligatorios no estén vacíos
    if (!nombre || !direccion || !telefono || !email) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    let imagen_path = getDefaultImagePath('organizacion', 'default_organizacion.png');

    // Verificar si se proporcionó una imagen en la solicitud
    if (req.file) {
      // Si se proporcionó una imagen, guardarla y obtener su ruta
      imagen_path = saveImageAndGetPath(req, 'organizacion', req.file.originalname);
    }

    // Obtener el valor máximo actual de id_organizacion
    const maxIdResult = await sequelize.query('SELECT MAX(id_organizacion) AS max_id FROM organizacion', {
      type: sequelize.QueryTypes.SELECT
    });

    const maxId = maxIdResult[0].max_id || 0; // Si no hay registros, establecer a 0

    // Asignar el nuevo id sumando 1 al valor máximo actual
    const nuevoId = maxId + 1;

    // Resto del código para registrar la organización en la base de datos
    const organizacion_almacenado = await organizacion_model.create({
      id_organizacion: nuevoId,
      nombre,
      direccion,
      telefono,
      email,
      descripcion,
      imagen: imagen_path
    });

    return res.status(200).json({ message: "Organización creada", organizacion_almacenado });

  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al registrar la organización";
    return res.status(500).json({ error: mensaje_error });
  }
};

export default registrar_organizacion;


// modifica los datos buscando por id
const modificar_organizacion = async (req, res) => {
  const organizacion_id = req.params.id;
  try {
    const organizacion = await organizacion_model.findByPk(organizacion_id);

    if (!organizacion) {
      const mensaje = "No se encontró la organizacion solicitada";
      return res.status(404).send(mensaje);
    }

    await organizacion.update(req.body);
    return res.status(200).json({ message: "Datos modificados", organizacion });
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al modificar la organizacion";
    return res.status(500).json({ error: mensaje_error });
  }
};

// elimina por id
const eliminar_organizacion = async (req, res) => {
  const organizacion_id = req.params.id;
  try {
    const organizacion = await organizacion_model.findByPk(organizacion_id);

    if (!organizacion) {
      const mensaje = "No se encontró la organizacion solicitada";
      return res.status(404).send(mensaje);
    }

    await organizacion.destroy();
    return res.status(200).send("organizacion eliminada");
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al eliminar la organizacion";
    return res.status(500).json({ error: mensaje_error });
  }
};

const cambiar_estado_organizacion = async (req, res) => {
  const organizacion_id = req.params.id;

  try {
    const organizacion = await organizacion_model.findByPk(organizacion_id);

    if (!organizacion) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    await organizacion.update({ activo: !organizacion.activo }); // Cambia el estado activo
    return res.status(200).json({ message: 'Estado modificado', activo: organizacion.activo });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al cambiar el estado del registro';
    return res.status(500).json({ error: mensaje_error });
  }
};

// exports
export {
  listar_organizacion,
  listar_organizacion_activo,
  obtener_organizacion,
  registrar_organizacion,
  modificar_organizacion,
  eliminar_organizacion,
  cambiar_estado_organizacion
};
