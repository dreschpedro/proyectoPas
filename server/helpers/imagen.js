import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Configurar el almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define la carpeta de destino según la entidad proporcionada (organizacion, usuario, etc.)
    const entityName = req.body.entityName || 'default'; // Puedes definir un valor predeterminado aquí

    // La carpeta de destino será '/uploads/[entityName]/'
    cb(null, `./uploads/${entityName}/`);
  },
  filename: (req, file, cb) => {
    // Usa el nombre original del archivo
    cb(null, file.originalname);
  },
});

// Configurar las opciones de multer
const upload = multer({ storage });

// Función de utilidad para obtener la ruta de la imagen por defecto
const getDefaultImagePath = (entityName, defaultImageFilename) => {
  const defaultImagePath = `/uploads/${entityName}/${defaultImageFilename}`;
  return defaultImagePath;
};

// Función de utilidad para guardar la imagen y devolver su ruta
const saveImageAndGetPath = (req, entityName, defaultImageFilename, organizationName) => {
  let imagePath = '';

  // Verificar si se proporcionó una imagen en la solicitud
  if (req.file) {
    const folderPath = `./uploads/${entityName}/${organizationName}`;
    const fullPath = `${folderPath}/${req.file.originalname}`;

    // Crear la carpeta de la organización si no existe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Mover la imagen al directorio de la organización
    fs.renameSync(req.file.path, fullPath);

    // Establecer la ruta de la imagen
    imagePath = fullPath;
  } else {
    // Si no se proporcionó una imagen, obtén la ruta de la imagen por defecto
    imagePath = getDefaultImagePath(entityName, defaultImageFilename);
  }

  console.log("Ruta de la imagen generada:", imagePath);
  return imagePath;
};

// Función de utilidad para eliminar la imagen temporal si no es la imagen por defecto
const deleteTempImage = (imagePath, defaultImagePath) => {
  if (imagePath && imagePath !== defaultImagePath) {
    // Verifica si la imagen no es la por defecto antes de eliminarla
    const fullPath = path.join(__dirname, `../public${imagePath}`);
    fs.unlinkSync(fullPath);
  }
};

export {
  upload,
  getDefaultImagePath,
  saveImageAndGetPath,
  deleteTempImage
};
