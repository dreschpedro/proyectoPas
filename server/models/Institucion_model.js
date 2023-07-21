import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const inst_model = sequelize.define('institucions', {
  id_institucion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  encargado: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    unique: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }

},
  {
    tableName: 'institucions',
    timestamps: true,
  });

// Crear la tabla "institucions" en la base de datos
inst_model.sync({ force: false }).then(() => {
  console.log('Tabla "institucion" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "institucion":', error);
});

export default inst_model;