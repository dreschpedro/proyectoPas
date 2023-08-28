import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Organizacion_model from './Organizacion_model.js';
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
  domicilio: {
    type: DataTypes.STRING(200),
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
  imagen: {
    type: DataTypes.STRING(200),
    allowNull: true, // Permitimos que el campo esté vacío
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

// Relación con la tabla organizacion
Personal_model.belongsTo(Organizacion_model, { foreignKey: 'id_organizacion' });

// Relación con la tabla Usuario
Personal_model.belongsTo(Usuario_model, { foreignKey: 'id_usuario' });


// Crear la tabla "Personal" en la base de datos
Personal_model.sync({ force: false }).then(() => {
  // console.log('Tabla "Personal" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "Personal":', error);
});
export default Personal_model;
