import inst_model from "../models/Institucion_model.js";
import { getDefaultImagePath, saveImageAndGetPath, deleteTempImage } from '../helpers/imagen.js';




// FUNCIONALIDADES
// consulta de todos los registros
const listar_institucion = async (req, res) => {
  try {
    const instituciones = await inst_model.findAll();
    return res.status(200).json(instituciones);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de institución";
    return res.status(500).json({ error: mensaje_error });
  }
};







// consulta por un registro (por id)
const obtener_institucion = async (req, res) => {
  const institucion_id = req.params.id;
  try {
    const institucion = await inst_model.findByPk(institucion_id);

    if (!institucion) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    return res.status(200).json(institucion); // Devuelve el objeto "institucion" sin cambios
  } catch (error) {
    console.error('Error al obtener la institución:', error);
    const mensaje_error = 'Ocurrió un error al obtener la institución';
    return res.status(500).json({ error: mensaje_error });
  }
};









// Registro de institución
const registrar_institucion = async (req, res) => {
  let imagen_path = getDefaultImagePath('institucion', 'default_institucion.png');

  try {
    // Obtener los datos de la institución del cuerpo de la solicitud
    const { nombre, direccion, telefono, email, descripcion } = req.body;

    // Verificar que los campos obligatorios no estén vacíos
    if (!nombre || !direccion || !telefono || !email || !descripcion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Obtener la ruta de la imagen (ya sea la imagen subida o la imagen por defecto)
    imagen_path = saveImageAndGetPath(req, 'institucion', 'default_institucion.png');

    // Crear la institución en la base de datos
    const institucion_almacenado = await inst_model.create({
      nombre,
      direccion,
      telefono,
      email,
      descripcion,
      imagen: imagen_path // Guardar la ruta de la imagen en la base de datos
    });

    return res.status(200).json({ message: "Institución creada", institucion_almacenado });
  } catch (error) {
    console.log(error);
    const mensaje_error = "Back->Ocurrió un error al registrar la institución";
    return res.status(500).json({ error: mensaje_error });
  } finally {
    // Eliminar la imagen temporal si no es la imagen por defecto
    if (imagen_path && imagen_path !== getDefaultImagePath('institucion', 'default_institucion.png')) {
      deleteTempImage(imagen_path, 'institucion', 'default_institucion.png');
    }
  }
};












// modifica los datos buscando por id
const modificar_institucion = async (req, res) => {
  const institucion_id = req.params.id;
  try {
    const institucion = await inst_model.findByPk(institucion_id);

    if (!institucion) {
      const mensaje = "No se encontró la institución solicitada";
      return res.status(404).send(mensaje);
    }

    await institucion.update(req.body);
    return res.status(200).json({ message: "Datos modificados", institucion });
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al modificar la institución";
    return res.status(500).json({ error: mensaje_error });
  }
};





// elimina por id
const eliminar_institucion = async (req, res) => {
  const institucion_id = req.params.id;
  try {
    const institucion = await inst_model.findByPk(institucion_id);

    if (!institucion) {
      const mensaje = "No se encontró la institución solicitada";
      return res.status(404).send(mensaje);
    }

    await institucion.destroy();
    return res.status(200).send("Institución eliminada");
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al eliminar la institución";
    return res.status(500).json({ error: mensaje_error });
  }
};








// exports
export {
  listar_institucion,
  obtener_institucion,
  registrar_institucion,
  modificar_institucion,
  eliminar_institucion,
};
