import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Institucion_model from './Institucion_model.js';
import Usuario_model from './Usuario_model.js';

const Personal_model = sequelize.define('personal', {
  id_personal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cuilt: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  profesion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
},
  {
    tableName: 'personal',
    timestamps: true,
  });

// Relación con la tabla Institucion
Personal_model.belongsTo(Institucion_model, { foreignKey: 'id_institucion' });

// Relación con la tabla Usuario
Personal_model.belongsTo(Usuario_model, { foreignKey: 'id_usuario' });


// Crear la tabla "Personal" en la base de datos
Personal_model.sync({ force: false }).then(() => {
  // console.log('Tabla "Personal" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "Personal":', error);
});
export default Personal_model;
