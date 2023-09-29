import Usuario_model from "../models/Usuario_model.js";
import generarId from "../helpers/generarId.js";
import sequelize from '../config/db.js';
import generarJWT from "../helpers/generarJWT.js";
import bcrypt from 'bcrypt';
import { serialize } from "cookie";

const registrar = async (req, res) => {
  const { email } = req.body;

  try {
    const existeUsuario = await Usuario_model.findOne({ where: { email } });

    if (existeUsuario) {
      return res.status(400).json({ msg: "Usuario ya registrado" });
    }

    // Obtener el valor máximo actual de id_usuario
    const maxIdResult = await sequelize.query('SELECT MAX(id_usuario) AS max_id FROM usuario', {
      type: sequelize.QueryTypes.SELECT
    });

    const maxId = maxIdResult[0].max_id || 0; // Si no hay registros, establecer a 0

    // Asignar el nuevo id sumando 1 al valor máximo actual
    const nuevoId = maxId + 1;

    // Crear el usuario con el nuevo id
    const usuario = await Usuario_model.create({
      id_usuario: nuevoId,
      ...req.body, // Copiar todos los demás campos del cuerpo de la solicitud
    });

    usuario.token = generarId();
    usuario.password = await bcrypt.hash(req.body.password, 10); // Hash de la contraseña antes de guardarla
    const usuarioAlmacenado = await usuario.save();

    return res.status(200).json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Ocurrió un error al registrar el usuario" });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario_model.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }

    if (!usuario.confirmado) {
      return res.status(403).json({ msg: "Tu cuenta no ha sido confirmada" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (passwordValido) {

      // desempaquetado de las variables
      const { id_usuario, username, email, rol } = usuario

      const token = generarJWT(id_usuario, username, rol);

      const serialized = serialize('myToken', token)

      return res.status(200).json({
        message: "Autenticación Exitosa",
        id_usuario: id_usuario,
        username: username,
        email: email,
        rol: rol,
        token: token
      });
    } else {
      return res.status(403).json({ msg: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Ocurrió un error al autenticar el usuario" });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  try {
    const usuarioConfirmar = await Usuario_model.findOne({ where: { token } });

    if (!usuarioConfirmar) {
      return res.status(403).json({ msg: "Token de usuario no válido" });
    }

    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    return res.status(200).json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Ocurrió un error al confirmar el usuario" });
  }
};

const perfil = async (req, res) => {
  try {
    const userId = req.userId; // Suponiendo que tienes un middleware que guarda el ID del usuario autenticado en req.userId
    const usuario = await Usuario_model.findOne({ where: { id_usuario: userId } });

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Aquí puedes seleccionar qué información del usuario deseas devolver en el perfil
    const perfilUsuario = {
      id_usuario: usuario.id_usuario,
      username: usuario.username,
      email: usuario.email,
      rol: usuario.rol,
      // Otros campos que desees mostrar en el perfil
    };

    return res.status(200).json(perfilUsuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Ocurrió un error al obtener el perfil del usuario" });
  }
};

export {
  registrar,
  autenticar,
  confirmar,
  perfil,
};
