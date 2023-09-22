import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.SECRETA, { expiresIn: "30d" })
}

export default generarJWT