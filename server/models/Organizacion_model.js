import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const organizacion_model = sequelize.define('organizacion', {
  id_organizacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    trim: true,
  },
  direccion: {
    type: DataTypes.STRING(50),
    allowNull: false,
    trim: true,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    trim: true,
    unique: true,
  },
  descripcion: {
    type: DataTypes.STRING(500),
    allowNull: false,
    trim: true,
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
    tableName: 'organizacion',
    timestamps: true,
  });

organizacion_model.sync({ force: false }).then(() => {
  // console.log('Tabla "organizacion" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "organizacion":', error);
});

export default organizacion_model;
