import { DataTypes } from 'sequelize';
import sequelize from './config/db.js';

const inst_model = sequelize.define('institucion', {
    id_institucion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    encargado: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
},
    {
        timestamps: true,
    });

export default inst_model;
