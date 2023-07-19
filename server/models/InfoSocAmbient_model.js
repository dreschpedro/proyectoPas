import { DataTypes } from 'sequelize';
import sequelize from './config/db.js';

const InfoSA_model = sequelize.define('info_socambient', {
    id_info_socambient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Agrega esta línea para generar automáticamente el valor del ID
    },
    nivel_escAct: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    grado_escAct: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    integrantes_casa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        timestamps: true,
    });

export default InfoSA_model;
