import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3005/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;
