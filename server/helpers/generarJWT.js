import jwt from 'jsonwebtoken';

const generarJWT = (id_usuario, username, rol) => {
  return jwt.sign(
    { id_usuario, username, rol },
    process.env.SECRETA,
    { expiresIn: "30d" })
}

export default generarJWT


// trer: username, rol, organizacion, imagen
// cargar als cookies 