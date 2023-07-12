import express from "express";
import {
    listar_persona,
    obtener_persona,
    registrar_persona,
    modificar_persona,
    eliminar_persona
} from "../controllers/personaController.js";

const router = express.Router();

router.get('/', listar_persona);
router.get('/:id', obtener_persona);
router.post('/registrar', registrar_persona);
router.put('/:id', modificar_persona);
router.delete('/:id', eliminar_persona)

export default router