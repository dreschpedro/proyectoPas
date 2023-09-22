import Cookies from "js-cookie";


const jwtValidation = () => {
const authToken = Cookies.get('authToken');

const jwt = require('jsonwebtoken');


// Tu token JWT (esto es solo un ejemplo, debes reemplazarlo con tu propio token).
const token = authToken;

// Clave secreta utilizada para verificar la firma (debe ser la misma que se utilizó para firmar el token).
const secretKey = 'lkjadslfk';

try {
  // Verificar y decodificar el token JWT.
  const decodedToken = jwt.verify(token, secretKey);

  // Acceder a los datos del usuario desde la carga útil del token.
  const username = decodedToken.username; // Suponiendo que "username" es un campo en la carga útil.


  // Ahora puedes usar "username" en tu aplicación.
  console.log('Nombre de usuario:', username);
} catch (error) {
  // Manejo de errores si el token no es válido o la firma no coincide.
  console.error('Error al verificar el token:', error.message);
}

}

export default jwtValidation;
