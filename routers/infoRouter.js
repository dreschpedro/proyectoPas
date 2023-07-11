import express from "express";
import {
    listaInfos,
    obtenerinfo,
    registrarInfo,
    modificarinfo,
    eliminarinfo
} from '../controllers/infoControllers.js'

const router=express.Router();

router.get('/', listaInfos);
router.get('/:id', obtenerinfo);
router.post('/registrar', registrarInfo);
router.put('/:id', modificarinfo);
router.delete('/:id', eliminarinfo)

export default router