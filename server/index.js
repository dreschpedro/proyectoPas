// imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // permite hacer solicitudes al back desde el front, sino se bloquean los puertos
import sequelize from './config/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3004;
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a PostgreSQL!');
  } catch (error) {
    console.log('Error al conectar a PostgreSQL:', error);
  }
})();

app.use(cors({
  origin: 'http://localhost:3000',
}));


// enpoints
import routerInstit from './routes/instituc.routes.js';
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

app.use('/api/institucion/', routerInstit)
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
