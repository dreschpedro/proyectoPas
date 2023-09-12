import express from 'express';
import { registrar, autenticar, confirmar, perfil } from '../controllers/usuarioControllers.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();


router.post('/registrar', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.get('/perfil/:token', checkAuth, perfil)

export default router;