import express from 'express';
import dotenv from 'dotenv';
import coneccionDB from './server/config/db.js';
import routerLibro from './server/routers/libroRouter.js';
import routerInfo from './server/routers/infoRouter.js';
import routerUsuario from './server/routers/usuarioRouter.js';
import routerPersonal from './server/routers/personalRouter.js';
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

coneccionDB();

app.get('/', (req, res) => {
    res.send(`Estas en Inicio`);
});

app.use('/api/personal', routerPersonal)
app.use('/api/usuarios', routerUsuario)
app.use('/api/libros/', routerLibro)
app.use('/api/info/', routerInfo)



app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})


