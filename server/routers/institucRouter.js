import express from "express";
import {
    listaInst,
    obtenerInst,
    registrarInst,
    modificarInst,
    eliminarInst
} from '../controllers/institucionControllers.js'

const router = express.Router();

router.get('/', listaInst);
router.get('/:id', obtenerInst);
router.post('/registrar', registrarInst);
router.put('/:id', modificarInst);
router.delete('/:id', eliminarInst)

export default router