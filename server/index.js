// imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // permite hacer solicitudes al back desde el front, sino se bloquean los puertos
import coneccionDB from './config/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
coneccionDB();

app.use(cors({
    origin: 'http://localhost:5173',
}));


// enpoints
import router_personal from './routes/personal.routes.js';
import router_info from './routes/info.routes.js';
import routerInstit from './routes/instituc.routes.js';
import routerPerson from './routes/persona.routes.js';
import routerProducto from './routes/producto.routes.js';
import routerServicio from './routes/servicio.routes.js';
import routerUsuario from './routes/usuario.routes.js';


app.get('/', (req, res) => res.send(`Estas en Inicio`));

app.use('/api/personal', router_personal)
app.use('/api/info/', router_info)
app.use('/api/institucion/', routerInstit)
app.use('/api/persona', routerPerson)
app.use('/api/producto', routerProducto)
app.use('/api/servicio', routerServicio)
app.use('/api/usuario', routerUsuario)

app.listen(port, () => console.log(`Escuchando en el ${port}`))