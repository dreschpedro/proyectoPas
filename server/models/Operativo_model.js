import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Operativo_model = sequelize.define('operativo', {
  id_operativo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  calle: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  altura_calle: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  barrio: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha_operativo: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora_operativo: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
},
  {
    timestamps: true,
  });

// Crear la tabla "Operativo" en la base de datos
Operativo_model.sync({ force: false }).then(() => {
  console.log('Tabla "Operavio" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "Operavio":', error);
});

export default Operativo_model;