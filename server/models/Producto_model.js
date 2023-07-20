import { DataTypes } from 'sequelize';
import sequelize from './config/db.js';

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
},
    {
        timestamps: true,
    });

export default Producto_model;
