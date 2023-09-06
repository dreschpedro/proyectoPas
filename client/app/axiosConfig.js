import axios from 'axios';

const serverURL = 'http://localhost:3005/api';

const instance = axios.create({
  baseURL: serverURL,
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
});

// Agregamos un interceptor para adjuntar el token JWT a las solicitudes
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // Obtener el token almacenado en el almacenamiento local
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
export { serverURL };
