import fs from 'fs';
import path from 'path';

// Función de utilidad para obtener la ruta de la imagen por defecto
const getDefaultImagePath = (entityType, defaultImageFilename) => {
  const defaultImagePath = `/uploads/${entityType}/${defaultImageFilename}`;
  return defaultImagePath;
};

// Función de utilidad para guardar la imagen y devolver su ruta
const saveImageAndGetPath = (req, entityType, defaultImageFilename) => {
  let imagePath = '';
  if (req.file) {
    imagePath = req.file.path;
  } else {
    imagePath = getDefaultImagePath(entityType, defaultImageFilename);
  }
  return imagePath;
};

// Función de utilidad para eliminar la imagen temporal si no es la imagen por defecto
const deleteTempImage = (imagePath, entityType, defaultImageFilename) => {
  if (imagePath) {
    // Verifica si la imagen no es la por defecto antes de eliminarla
    if (!imagePath.includes(`/uploads/${entityType}/${defaultImageFilename}`)) {
      fs.unlinkSync(imagePath);
    }
  }
};

export {
  getDefaultImagePath,
  saveImageAndGetPath,
  deleteTempImage
};
