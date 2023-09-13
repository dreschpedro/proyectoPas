import Personal_model from "../models/Personal_model.js";
import Usuario_model from "../models/Usuario_model.js";
import { getDefaultImagePath, saveImageAndGetPath, deleteTempImage } from "../helpers/imagen.js";
import organizacion_model from "../models/Organizacion_model.js";

// Consulta de todos los registros activos
const listar_personal = async (req, res) => {
  try {
    const personals = await Personal_model.findAll({
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
        {
          model: Usuario_model,
          attributes: ["username"],
          raw: true
        }
      ],
    });
    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const personalsConOrganizacion = personals.map((personal) => ({
      ...personal.get(), // Copiar todos los campos de 'personal'
      organizacion: personal.organizacion.nombre, // Tomamos solo el nombre de la organización
      usuario: personal.usuario.username
    }));

    return res.status(200).json(personalsConOrganizacion);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de personals";
    return res.status(500).json({ error: mensaje_error });
  }
};

//consulta por los personal activos
const listar_personal_activo = async (req, res) => {
  try {
    const personal = await Personal_model.findAll({
      where: { activo: true },
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
        {
          model: Usuario_model,
          attributes: ["username"],
          raw: true
        }
      ],
    });
    // A continuación, puedes mapear el resultado para ajustar la estructura de salida
    const personalsConOrganizacion = personal.map((personal) => ({
      ...personal.get(), // Copiar todos los campos de 'personal'
      organizacion: personal.organizacion.nombre, // Tomamos solo el nombre de la organización
      usuario: personal.usuario.username
    }));

    return res.status(200).json(personalsConOrganizacion);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de personal";
    return res.status(500).json({ error: mensaje_error });
  }
};

// consulta de todos los registros con activo: true
const obtener_personal = async (req, res) => {
  const personal_id = req.params.id;

  try {
    const personal = await Personal_model.findOne({
      where: { id_personal: personal_id, activo: true },
      include: [
        {
          model: organizacion_model,
          attributes: ["nombre"], // Solo seleccionamos el nombre
          raw: true, // Esto devuelve los resultados en formato plano, no objetos Sequelize
        },
        {
          model: Usuario_model,
          attributes: ["username", "email", "rol"],
        }
      ],
    });

    // Modificamos la respuesta para reemplazar 'organizacion' con el nombre
    const personalConOrganizacion = {
      ...personal.get(), // Copiamos todos los campos de 'personal'
      organizacion: personal.organizacion.nombre, // Reemplazamos 'organizacion'
    };

    if (!personal) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    return res.status(200).json({ personalConOrganizacion }); // Devuelve también la organización
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al obtener el registro de personal';
    return res.status(500).json({ error: mensaje_error });
  }
};

// registro de personal
const registrar_personal = async (req, res) => {
  let imagen_path = getDefaultImagePath('personal', 'default_personal.png'); // Ruta de imagen por defecto

  try {
    const personal_body = req.body;

    // Verificar si se proporcionó una imagen en la solicitud
    if (req.file) {
      // Si se proporcionó una imagen, guardarla y obtener su ruta
      imagen_path = saveImageAndGetPath(req, 'personal', 'default_personal.png');
    }

    // Crear el registro de personal en la base de datos
    const personal_almacenado = await Personal_model.create({
      ...personal_body,
      imagen: imagen_path // Guardar la ruta de la imagen en la base de datos
    });

    return res.status(200).json({ message: 'Registro creado', personal_almacenado });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al registrar el personal';
    return res.status(500).json({ error: mensaje_error });
  } finally {
    // Eliminar la imagen temporal si no es la imagen por defecto
    if (imagen_path && imagen_path !== getDefaultImagePath('personal', 'default_personal.png')) {
      deleteTempImage(imagen_path, 'personal', 'default_personal.png');
    }
  }
};

// Modifica los datos de un registro activo por id
const modificar_personal = async (req, res) => {
  const personal_id = req.params.id;

  try {
    // Consulta el registro y verifica si está activo
    const personal = await Personal_model.findOne({
      where: { id_personal: personal_id, activo: true },
    });

    if (!personal) {
      return res.status(404).send('El registro no se encuentra o no está activo');
    }

    await personal.update(req.body);
    return res.status(200).json({ message: 'Registro modificado', personal });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al modificar el registro';
    return res.status(500).json({ error: mensaje_error });
  }
};

// Cambiar el estado 'activo' del registro por id
const cambiar_estado_personal = async (req, res) => {
  const personal_id = req.params.id;

  try {
    const personal = await Personal_model.findByPk(personal_id);

    if (!personal) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    await personal.update({ activo: !personal.activo }); // Cambia el estado activo
    return res.status(200).json({ message: 'Estado modificado', activo: personal.activo });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al cambiar el estado del registro';
    return res.status(500).json({ error: mensaje_error });
  }
};

// exports
export {
  listar_personal,
  listar_personal_activo,
  obtener_personal,
  registrar_personal,
  modificar_personal,
  cambiar_estado_personal
};
