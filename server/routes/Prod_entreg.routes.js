import express from "express";
import {
  listar_prodEnt,
  obtener_prodEnt,
  registrar_prodEnt,
  modificar_prodEnt,
  eliminar_prodEnt,
  cambiar_estado_prodEnt
} from "../controllers/Prod_entregController.js";

const router = express.Router();

router.get('/', listar_prodEnt);
router.get('/:id', obtener_prodEnt);
router.post('/registrar', registrar_prodEnt);
router.put('/:id', modificar_prodEnt);
router.delete('/:id', eliminar_prodEnt)
router.put('/estado/:id', cambiar_estado_prodEnt)

export default router