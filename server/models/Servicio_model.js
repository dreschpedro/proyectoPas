import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Servicio_model = sequelize.define('servicio', {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
},
    {
        timestamps: true,
    });

// Relación con la tabla Institucion
import Institucion_model from './Institucion_model.js';
Servicio_model.belongsTo(Institucion_model, { foreignKey: 'id_institucion' });

export default Servicio_model;
