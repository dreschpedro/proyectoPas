import { DataTypes } from 'sequelize';
import sequelize from './config/db.js';
import Institucion_model from './Institucion_model.js';
import Usuario_model from './Usuario_model.js';

const Personal_model = sequelize.define('personal', {
    id_personal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    cuilt: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    profesion: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
},
    {
        timestamps: true,
    });

// Relación con la tabla Institucion
Personal_model.belongsTo(Institucion_model, { foreignKey: 'id_institucion' });

// Relación con la tabla Usuario
Personal_model.belongsTo(Usuario_model, { foreignKey: 'id_usuario' });

export default Personal_model;
