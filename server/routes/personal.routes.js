import express from "express";
import {
    listar_personal,
    listar_personal_activo,
    listar_personal_pas_completo,
    obtener_personal,
    registrar_personal,
    modificar_personal,
    cambiar_estado_personal
} from "../controllers/personal_controller.js";

const router = express.Router();

router.get('/', listar_personal);
router.get('/activo', listar_personal_activo);
router.get('/pas', listar_personal_pas_completo);
router.get('/:id', obtener_personal);
router.post('/registrar', registrar_personal);
router.put('/:id', modificar_personal);
router.put('/estado/:id', cambiar_estado_personal)

export default router