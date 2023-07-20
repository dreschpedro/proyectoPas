import Usuario_model from "../models/Usuario_model.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import bcrypt from 'bcrypt';

const registrar = async (req, res) => {
  const { email } = req.body;

  try {
    const existeUsuario = await Usuario_model.findOne({ where: { email } });

    if (existeUsuario) {
      return res.status(400).json({ msg: "Usuario ya registrado" });
    }

    const usuario = await Usuario_model.create(req.body);
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
      return res.status(200).json({
        message: "Registro Modificado",
        data: {
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre,
          email: usuario.email,
          token: generarJWT(usuario.id_usuario)
        }
      });
    } else {
      return res.status(403).json({ msg: "Password incorrecto" });
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
      nombre: usuario.nombre,
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
