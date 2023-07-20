import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Servicio_model from './Servicio_model.js';
import Cliente_model from './Cliente_model.js';
import Operativo_model from './Operativo_model.js';

const ServRealizado_model = sequelize.define(
  'serv_realizado',
  {
    id_serv_realizado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  }
);

ServRealizado_model.belongsTo(Servicio_model, {
  foreignKey: 'id_servicio',
});

ServRealizado_model.belongsTo(Cliente_model, {
  foreignKey: 'id_cliente',
});

ServRealizado_model.belongsTo(Operativo_model, {
  foreignKey: 'id_operativo',
});

export default ServRealizado_model;
