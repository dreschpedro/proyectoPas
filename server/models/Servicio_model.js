import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Organizacion_model from './Organizacion_model.js';

const Servicio_model = sequelize.define('servicio', {
  id_servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
},
  {
    tableName: 'servicio',
    timestamps: true,
  });

// Relación con la tabla Institucion
Servicio_model.belongsTo(Organizacion_model, { foreignKey: 'id_organizacion' });

// Crear la tabla "servicios" en la base de datos
Servicio_model.sync({ force: false }).then(() => {
  // console.log('Tabla "servicios" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "servicios":', error);
});

export default Servicio_model;
