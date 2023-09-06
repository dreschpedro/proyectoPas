import express from "express";
import {
  listar_productos,
  listar_producto_activo,
  listar_producto_por_organizacion,
  obtener_producto,
  registrar_producto,
  modificar_producto,
  cambiar_estado_producto
} from "../controllers/producto_controller.js";

const router = express.Router();

router.get('/', listar_productos);
router.get('/activo', listar_producto_activo);
router.get('/organizacion/:organizacion_id', listar_producto_por_organizacion);
router.get('/:id', obtener_producto);
router.post('/registrar', registrar_producto);
router.put('/:id', modificar_producto);
router.put('/estado/:id', cambiar_estado_producto)

export default router