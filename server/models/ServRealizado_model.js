import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Servicio_model from './Servicio_model.js';
import Cliente_model from './Cliente_model.js';

const ServRealizado_model = sequelize.define(
  'serv_realizado',
  {
    id_serv_realizado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  {
    tableName: 'serv_realizado',
    timestamps: true,
  }
);

ServRealizado_model.belongsTo(Servicio_model, {
  foreignKey: 'id_servicio',
});

ServRealizado_model.belongsTo(Cliente_model, {
  foreignKey: 'id_cliente',
});


// Crear la tabla "serv_realizados" en la base de datos
ServRealizado_model.sync({ force: false }).then(() => {
  // console.log('Tabla "serv_realizados" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "serv_realizados":', error);
});

export default ServRealizado_model;
