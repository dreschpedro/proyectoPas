import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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
  precio: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
  },
  entregado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  fecha_entrega: {
    type: DataTypes.DATEONLY,
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

// Crear la tabla "Porducto" en la base de datos
Producto_model.sync({ force: false }).then(() => {
  // console.log('Tabla "Porducto" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "Producto":', error);
});

export default Producto_model;
