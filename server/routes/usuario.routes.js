import express from 'express';
import { registrar, autenticar, confirmar, perfil } from '../controllers/usuarioControllers.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();


router.post('/register', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.get('/perfil', checkAuth, perfil)

export default router;