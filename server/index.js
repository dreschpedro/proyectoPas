// imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // permite hacer solicitudes al back desde el front, sino se bloquean los puertos
import sequelize from './config/db.js';
import path from 'path';
import tinify from 'tinify';

tinify.key = process.env.TINIFY_API;
dotenv.config();
const app = express();
const port = process.env.PORT || 3006;
app.use(express.json());

import { fileURLToPath } from 'url'; // Importa la función fileURLToPath
import { dirname } from 'path'; // Importa la función dirname

// Utiliza import.meta.url para obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Utiliza la función dirname para obtener el directorio padre del archivo actual
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa');
  } catch (error) {
    console.log('Error al conectar a PostgreSQL:', error);
  }
})();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3005'],
}));


// enpoints
import routerOrganiz from './routes/organizacion.routes.js';
import routerServicio from './routes/servicio.routes.js';
import routerProducto from './routes/producto.routes.js';
import routerUsuario from './routes/usuario.routes.js';
import routerOper from './routes/opeartivo.routes.js';
import routerInfoSA from './routes/info.routes.js';
import routerCliente from './routes/cliente.routes.js';
import routerServReal from './routes/servReal.routes.js';
import routerPersonal from './routes/personal.routes.js';
import routerProdEnt from './routes/Prod_entreg.routes.js';


app.get('/', (req, res) => res.send(`Estas en Inicio`));

app.use('/api/organizacion/', routerOrganiz)
app.use('/api/servicio', routerServicio)
app.use('/api/producto', routerProducto)
app.use('/api/usuario', routerUsuario)
app.use('/api/operativo/', routerOper)
app.use('/api/info/', routerInfoSA)
app.use('/api/cliente', routerCliente)
app.use('/api/personal', routerPersonal)
app.use('/api/serv_real', routerServReal)
app.use('/api/entregar', routerProdEnt)



app.listen(port, () => console.log(`Escuchando en el ${port}`))
