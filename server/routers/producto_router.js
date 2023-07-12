import express from "express";
import {
    listar_producto,
    obtener_producto,
    registrar_producto,
    modificar_producto,
    eliminar_producto
} from "../controllers/producto_controller.js";

const router = express.Router();

router.get('/', listar_producto);
router.get('/:id', obtener_producto);
router.post('/registrar', registrar_producto);
router.put('/:id', modificar_producto);
router.delete('/:id', eliminar_producto)

export default router