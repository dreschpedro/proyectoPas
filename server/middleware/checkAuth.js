import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(' ')[1];
    } catch (error) {
      console.error(error);
    }
  }

  if (!token) {
    // Si no se proporciona un token en la solicitud, puedes enviar una respuesta de error o realizar otras acciones
    return res.status(401).json({ error: 'No se proporcionó un token válido' });
  }

  // Verificar el token
  jwt.verify(token, process.env.SECRETA, (err, decodedToken) => {
    if (err) {
      // Si el token no es válido, puedes enviar una respuesta de error o realizar otras acciones
      console.error(err);
      return res.status(401).json({ error: 'Token inválido' });
    } else {
      // Si el token es válido, puedes realizar acciones adicionales
      // Por ejemplo, puedes obtener información del usuario desde el 'decodedToken' y agregarlo a la solicitud para su uso en otros middleware o controladores
      req.user = decodedToken;
      next();
    }
  });
};

export default checkAuth;
