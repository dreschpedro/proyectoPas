import express from "express";
import {
  listar_cliente,
  obtener_cliente,
  buscar_cliente_por_dni,
  registrar_cliente,
  modificar_cliente,
  cambiar_estado_cliente
} from "../controllers/cliente_controller.js";

const router = express.Router();

router.get('/', listar_cliente);
router.get('/:id', obtener_cliente);
router.get('/dni/:dni', buscar_cliente_por_dni); // Cambio en la ruta para usar parámetro de ruta
router.post('/registrar', registrar_cliente);
router.put('/:id', modificar_cliente);
router.put('/estado/:id', cambiar_estado_cliente);

export default router;
