import Usuario_model from "../models/Usuario_model.js";
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  // evitar registros duplicados, en realidad lo valida mongoose, pero es para mandar un msj claro al usuario
  const { email } = req.body;

  const existeUsuario = await Usuario_model.findOne({ email }); // busca en la DB el mail ingresado
  if (existeUsuario) { // si existe el mail
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message })
  }

  try { // si no existe el mail en la DB
    const usuario = new Usuario_model(req.body); // genera el user
    usuario.token = generarId(); // genera el token de sesion
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado)

  } catch (error) {
    console.log(error)
  }
}

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  // comprobar si el usuario existe
  const usuario = await Usuario_model.findOne({ email });
  if (!usuario) { // si no existe el usuario
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message })
  }

  // comprobar si ya está confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message })
  }

  // comprobar el password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id)
    })
  } else {
    const error = new Error("Password incorrecto");
    return res.status(403).json({ msg: error.message })
  }
}

const confirmar = async (req, res) => { // el token pasa como parámetro en la ruta -> /confirmar/:token
  const { token } = req.params
  const usuarioConfirmar = await Usuario_model.findOne({ token })
  if (!usuarioConfirmar) {
    const error = new Error("Token de usuario no valido");
    return res.status(403).json({ msg: error.message })
  }
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" })
  } catch (error) {

  }
}

const perfil = async (req, res) => {
  console.log('Desde perfil')
}

export {
  registrar,
  autenticar,
  confirmar,
  perfil,
}

