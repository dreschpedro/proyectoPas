// imports
import express from 'express';
import dotenv from 'dotenv';
import coneccionDB from './config/db.js';

// rutas
import routerPersonal from './routers/personalRouter.js';
import routerInfo from './routers/infoRouter.js';
import routerInstit from './routers/institucRouter.js';
import routerUsuario from './routers/usuarioRouter.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

coneccionDB();

app.get('/', (req, res) => {
    res.send(`Estas en Inicio`);
});

app.use('/personal', routerPersonal)
app.use('/info/', routerInfo)
app.use('/institucion/', routerInstit)
// app.use('/usuario', routerUsuario)


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})