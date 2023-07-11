import express from 'express';
import dotenv from 'dotenv';
import coneccionDB from './config/db.js';
import routerLibro from './routers/libroRouter.js';
import routerInfo from './routers/infoRouter.js'
import routerUsuario from './routers/usuarioRouter.js'
import routerPersonal from './routers/personalRouter.js';
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


