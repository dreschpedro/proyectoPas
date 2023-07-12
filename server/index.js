// imports
import express from 'express';
import dotenv from 'dotenv';
import coneccionDB from './config/db.js';

// rutas
import router_personal from './routers/personalRouter.js';
import router_info from './routers/infoRouter.js';
import routerInstit from './routers/institucRouter.js';
import routerPerson from './routers/persona_router.js';
import routerProducto from './routers/producto_router.js';
import routerServicio from './routers/servicio_router.js';
import routerUsuario from './routers/usuarioRouter.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

coneccionDB();

app.get('/', (req, res) => {
    res.send(`Estas en Inicio`);
});

app.use('/personal', router_personal)
app.use('/info/', router_info)
app.use('/institucion/', routerInstit)
app.use('/persona', routerPerson)
app.use('/producto', routerProducto)
app.use('/servicio', routerServicio)
// app.use('/usuario', routerUsuario)


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})