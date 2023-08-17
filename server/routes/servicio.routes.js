import express from "express";
// ...
import {
  listar_servicio,
  listar_servicio_por_organizacion,
  obtener_servicio,
  registrar_servicio,
  modificar_servicio,
  cambiar_estado_servicio
} from "../controllers/servicio_controller.js";

const router = express.Router();

router.get('/', listar_servicio);
router.get("/organizacion/:organizacion_id", listar_servicio_por_organizacion);
router.get('/:id', obtener_servicio);
router.post('/registrar', registrar_servicio);
router.put('/:id', modificar_servicio);
router.put('/estado/:id', cambiar_estado_servicio)

export default router;
