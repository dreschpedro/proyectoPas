import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import ServRealizado_model from './ServRealizado_model.js';
import Producto_model from './Producto_model.js';


const ProdEntreg_model = sequelize.define('prod_entreg', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  entregado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  fecha_entrega: {
    type: DataTypes.DATEONLY,
  },
},
  {
    tableName: 'prod_entreg',
    timestamps: true,
  }
);

ProdEntreg_model.belongsTo(ServRealizado_model, {
  foreignKey: 'id',
});

ProdEntreg_model.belongsTo(Producto_model, {
  foreignKey: 'id',
});

// Crear la tabla "Producto Entregado" en la base de datos
ProdEntreg_model.sync({ force: false }).then(() => {
  // console.log('Tabla "Producto Entregado" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "Producto Entregado":', error);
});

export default ProdEntreg_model;