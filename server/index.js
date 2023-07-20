// imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // permite hacer solicitudes al back desde el front, sino se bloquean los puertos
import sequelize from './config/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
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
  origin: 'http://localhost:5173',
}));


// enpoints
import routerCliente from './routes/cliente.routes.js';
import routerInfoSA from './routes/info.routes.js';
import routerInstit from './routes/instituc.routes.js';
import routerOper from './routes/opeartivo.routes.js';
import routerPersonal from './routes/personal.routes.js';
import routerProdEnt from './routes/Prod_entreg.routes.js';
import routerProducto from './routes/producto.routes.js';
import routerServicio from './routes/servicio.routes.js';
import routerServReal from './routes/servReal.routes.js';
import routerUsuario from './routes/usuario.routes.js';


app.get('/', (req, res) => res.send(`Estas en Inicio`));

app.use('/api/cliente', routerCliente)
app.use('/api/info/', routerInfoSA)
app.use('/api/institucion/', routerInstit)
app.use('/api/operativo/', routerOper)
app.use('/api/personal', routerPersonal)
app.use('/api/entregar', routerProdEnt)
app.use('/api/producto', routerProducto)
app.use('/api/servicio', routerServicio)
app.use('/api/serv_real', routerServReal)
app.use('/api/usuario', routerUsuario)

app.listen(port, () => console.log(`Escuchando en el ${port}`))

