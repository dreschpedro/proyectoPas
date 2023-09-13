import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Organizacion_model from './Organizacion_model.js';

const Producto_model = sequelize.define('producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(),
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
},
  {
    tableName: 'producto',
    timestamps: true,
  });

Producto_model.belongsTo(Organizacion_model, { foreignKey: 'id_organizacion' });

// Crear la tabla "Porducto" en la base de datos
Producto_model.sync({ force: false }).then(() => {
  // console.log('Tabla "Porducto" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "Producto":', error);
});

export default Producto_model;
