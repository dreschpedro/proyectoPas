import express from "express";
import {
    listar_info,
    obtener_info,
    registrar_info,
    modificar_info,
    eliminar_info
} from '../controllers/infoControllers.js'

const router=express.Router();

router.get('/', listar_info);
router.get('/:id', obtener_info);
router.post('/registrar', registrar_info);
router.put('/:id', modificar_info);
router.delete('/:id', eliminar_info)

export default router