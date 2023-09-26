import jwt from 'jsonwebtoken';


const SECRET_KEY = "lkjadslfk"; // Reemplaza con tu clave secreta real


console.log('esta conectado')
// Función para verificar y decodificar el token JWT
const getDecodedToken = (token) => {
  // console.log('el token desde la funcion: ', token)
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return error;
  }
};

module.exports = { getDecodedToken };
