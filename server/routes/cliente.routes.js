import express from "express";
import {
    listar_cliente,
    obtener_cliente,
    registrar_cliente,
    modificar_cliente,
    cambiar_estado_cliente
} from "../controllers/cliente_controller.js";

const router = express.Router();

router.get('/', listar_cliente);
router.get('/:id', obtener_cliente);
router.post('/registrar', registrar_cliente);
router.put('/:id', modificar_cliente);
router.put('/estado/:id', cambiar_estado_cliente)

export default router