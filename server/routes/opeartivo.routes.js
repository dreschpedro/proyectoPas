import express from "express";
import {
  listar_operativo,
  obtener_operativo,
  registrar_operativo,
  modificar_operativo,
  eliminar_operativo
} from "../controllers/operativoController.js";

const router = express.Router();

router.get('/', listar_operativo);
router.get('/:id', obtener_operativo);
router.post('/registrar', registrar_operativo);
router.put('/:id', modificar_operativo);
router.delete('/:id', eliminar_operativo)

export default router