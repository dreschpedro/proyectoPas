import express from "express";
import {
    listaLibros,
    obtenerLibro,
    registrarLibro,
    modificarLibro,
    eliminarLibro
} from '../controllers/libroControllers.js'

const router=express.Router();

router.get('/', listaLibros);
router.get('/:id', obtenerLibro);
router.post('/registrar', registrarLibro);
router.put('/:id', modificarLibro);
router.delete('/:id', eliminarLibro)

export default router