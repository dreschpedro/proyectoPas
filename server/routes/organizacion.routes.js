import express from "express";
import multer from "multer";
import { fileURLToPath } from 'url'; // Importa fileURLToPath desde el módulo url
import path from "path";

import {
  listar_organizacion,
  obtener_organizacion,
  registrar_organizacion,
  modificar_organizacion,
  eliminar_organizacion
} from '../controllers/organizacionControllers.js';

const router = express.Router();

// Obtiene la ruta de archivo del módulo actual
const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio del módulo
const __dirname = path.dirname(__filename);

// Configurar multer para manejar la carga de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads', 'organizacion'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Rutas para las organizaciones
router.get('/', listar_organizacion);
router.get('/:id', obtener_organizacion);
router.post('/registrar', upload.single('imagen'), registrar_organizacion);
router.put('/:id', modificar_organizacion);
router.delete('/:id', eliminar_organizacion);

export default router;
