import express from "express";
import {
    listar_userExt,
    obtener_userExt,
    registrar_userExt,
    modificar_userExt,
    eliminar_userExt
} from "../controllers/UserExt_controller.js";

const router = express.Router();

router.get('/', listar_userExt);
router.get('/:id', obtener_userExt);
router.post('/registrar', registrar_userExt);
router.put('/:id', modificar_userExt);
router.delete('/:id', eliminar_userExt)

export default router