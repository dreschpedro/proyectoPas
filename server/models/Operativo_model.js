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
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
},
  {
    timestamps: true,
  });


export default Operativo_model;