//axiosConfig
import axios from 'axios';

const serverURL = 'http://localhost:3005';

const instance = axios.create({
  baseURL: `${serverURL}/api/`,
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;
export { serverURL }; // Agregamos la exportación de serverURL
