import fs from 'fs';
import path from 'path';

// Función de utilidad para obtener la ruta de la imagen por defecto
const getDefaultImagePath = () => {
  const defaultImagePath = path.join(__dirname, '../uploads/institucion/default_institucion.png');
  return defaultImagePath;
};

// Función de utilidad para guardar la imagen y devolver su ruta
const saveImageAndGetPath = (req) => {
  let imagePath = '';
  if (req.file) {
    imagePath = req.file.path;
  } else {
    imagePath = getDefaultImagePath();
  }
  return imagePath;
};

// Función de utilidad para eliminar la imagen temporal si no es la imagen por defecto
const deleteTempImage = (imagePath) => {
  if (imagePath && !imagePath.includes('../uploads/institucion/default_institucion.png')) {
    fs.unlinkSync(imagePath);
  }
};


export {
  getDefaultImagePath,
  saveImageAndGetPath,
  deleteTempImage
}