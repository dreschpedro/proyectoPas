import express from "express";
import {
    listar_servicio,
    obtener_servicio,
    registrar_servicio,
    modificar_servicio,
    eliminar_servicio
} from "../controllers/servicio_controller.js";

const router = express.Router();

router.get('/', listar_servicio);
router.get('/:id', obtener_servicio);
router.post('/registrar', registrar_servicio);
router.put('/:id', modificar_servicio);
router.delete('/:id', eliminar_servicio)

export default router