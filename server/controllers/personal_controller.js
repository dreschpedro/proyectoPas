import Personal_model from "../models/Personal_model.js";
import Usuario_model from "../models/Usuario_model.js";
import { getDefaultImagePath, saveImageAndGetPath, deleteTempImage } from "../helpers/imagen.js";
import Organizacion_model from "../models/Organizacion_model.js"; 

// consulta de todos los registros
const listar_personal = async (req, res) => {
  try {
    const personal = await Personal_model.findAll({
      include: [{ model: Usuario_model, attributes: ["username"] }],
    });

    // console.log('Personal data:', personal);

    return res.status(200).json(personal);
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al obtener los registros de personal';
    return res.status(500).json({ error: mensaje_error });
  }
};


// consulta por un registro (por id)
const obtener_personal = async (req, res) => {
  const personal_id = req.params.id;

  try {
    const personal = await Personal_model.findByPk(personal_id, {
      include: [
        {
          model: Usuario_model,
          attributes: ["username", "email", "rol"],
        },
      ],
    });

    // Corrige la consulta para obtener la organización
    const organizacion = await Organizacion_model.findByPk(personal.id_organizacion, {
      attributes: ["nombre"],
    });

    if (!personal) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    return res.status(200).json({ personal, organizacion }); // Devuelve también la organización
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al obtener el registro de personal';
    return res.status(500).json({ error: mensaje_error });
  }
};


// registro de personal
const registrar_personal = async (req, res) => {
  try {
    const personal_body = req.body;
    const personal_almacenado = await Personal_model.create(personal_body);
    return res.status(200).json({ message: 'Registro creado', personal_almacenado });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al registrar el personal';
    return res.status(500).json({ error: mensaje_error });
  }
};

// modifica los datos buscando por id
const modificar_personal = async (req, res) => {
  const personal_id = req.params.id;

  try {
    const personal = await Personal_model.findByPk(personal_id);

    if (!personal) {
      return res.status(404).send('El registro no se encuentra');
    }

    await personal.update(req.body);
    return res.status(200).json({ message: 'Registro modificado', personal });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al modificar el registro';
    return res.status(500).json({ error: mensaje_error });
  }
};

// elimina por id
const eliminar_personal = async (req, res) => {
  const personal_id = req.params.id;

  try {
    const personal = await Personal_model.findByPk(personal_id);

    if (!personal) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    await personal.destroy();
    return res.status(200).send('Registro eliminado');
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al eliminar el registro';
    return res.status(500).json({ error: mensaje_error });
  }
};

// exports
export {
  listar_personal,
  obtener_personal,
  registrar_personal,
  modificar_personal,
  eliminar_personal
};
