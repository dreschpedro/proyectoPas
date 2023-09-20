import fs from 'fs';
import path from 'path';

// Función de utilidad para obtener la ruta de la imagen por defecto
const getDefaultImagePath = (entityType, defaultImageFilename) => {
  const defaultImagePath = `/uploads/${entityType}/${defaultImageFilename}`;
  return defaultImagePath;
};

// Función de utilidad para guardar la imagen y devolver su ruta
const saveImageAndGetPath = (req, entityType) => {
  let imagePath = '';

  // Obtén el nombre original del archivo
  const originalFilename = req.file.originalname;

  if (req.file) {
    // Define la ruta donde se guardará la imagen
    imagePath = `/uploads/${entityType}/${originalFilename}`;

    // Mueve el archivo subido al directorio deseado
    fs.renameSync(req.file.path, path.join(__dirname, `../public${imagePath}`));
  } else {
    // Si no se proporcionó una imagen, obtén la ruta de la imagen por defecto
    imagePath = getDefaultImagePath(entityType, 'default_organizacion.png');
  }

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
  getDefaultImagePath,
  saveImageAndGetPath,
  deleteTempImage
};