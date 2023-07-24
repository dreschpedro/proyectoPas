import express from "express";

import {
    listar_institucion,
    obtener_institucion,
    registrar_institucion,
    modificar_institucion,
    eliminar_institucion
} from '../controllers/institucionControllers.js';

const router = express.Router();

// Rutas para las instituciones
router.get('/', listar_institucion);
router.get('/:id', obtener_institucion);
router.post('/registrar', registrar_institucion);
router.put('/:id', modificar_institucion);
router.delete('/:id', eliminar_institucion);

export default router;