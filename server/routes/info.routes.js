import express from "express";
import {
    listar_infoSA,
    obtener_infoSA,
    registrar_infoSA,
    modificar_infoSA,
    eliminar_infoSA
} from '../controllers/infoControllers.js'

const router = express.Router();

router.get('/', listar_infoSA,);
router.get('/:id', obtener_infoSA,);
router.post('/registrar', registrar_infoSA,);
router.put('/:id', modificar_infoSA,);
router.delete('/:id', eliminar_infoSA)

export default router