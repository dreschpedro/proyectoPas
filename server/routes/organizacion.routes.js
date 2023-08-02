import express from "express";

import {
    listar_organizacion,
    obtener_organizacion,
    registrar_organizacion,
    modificar_organizacion,
    eliminar_organizacion
} from '../controllers/organizacionControllers.js';

const router = express.Router();

// Rutas para las organizaciones
router.get('/', listar_organizacion);
router.get('/:id', obtener_organizacion);
router.post('/registrar', registrar_organizacion);
router.put('/:id', modificar_organizacion);
router.delete('/:id', eliminar_organizacion);

export default router;