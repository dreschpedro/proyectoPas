// imports
import express from 'express';
import dotenv from 'dotenv';
import coneccionDB from './config/db.js';

// rutas
import router_personal from './routers/personal.routes.js';
import router_info from './routers/info.routes.js';
import routerInstit from './routers/instituc.routes.js';
import routerPerson from './routers/persona.routes.js';
import routerProducto from './routers/producto.routes.js';
import routerServicio from './routers/servicio.routes.js';
import routerUsuario from './routers/usuario.routes.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

coneccionDB();

app.get('/', (req, res) => {
    res.send(`Estas en Inicio`);
});

app.use('/api/personal', router_personal)
app.use('/api/info/', router_info)
app.use('/api/institucion/', routerInstit)
app.use('/api/persona', routerPerson)
app.use('/api/producto', routerProducto)
app.use('/api/servicio', routerServicio)
app.use('/api/usuario', routerUsuario)

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})