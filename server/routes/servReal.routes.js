import express from "express";
import {
  listar_servReal,
  obtener_servReal,
  registrar_servReal_con_cliente,
  modificar_servReal,
  eliminar_servReal
} from "../controllers/servRealizado_controller.js";

const router = express.Router();

router.get('/', listar_servReal);
router.get('/:id', obtener_servReal);
router.post("/registrar", registrar_servReal_con_cliente);
router.put('/:id', modificar_servReal);
router.delete('/:id', eliminar_servReal)

export default router