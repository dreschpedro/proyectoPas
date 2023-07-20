import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import ServRealizado_model from './ServRealizado_model.js';
import Producto_model from './Producto_model.js';

const ProdEntreg_model = sequelize.define(
  'prod_entreg',
  {
    id_prod_entreg: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
  }
);

ProdEntreg_model.belongsTo(ServRealizado_model, {
  foreignKey: 'id_serv_realizado',
});

ProdEntreg_model.belongsTo(Producto_model, {
  foreignKey: 'id_producto',
});

export default ProdEntreg_model;