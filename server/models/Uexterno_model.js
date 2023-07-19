import { DataTypes } from 'sequelize';
import sequelize from './config/db.js';
import Operativo_model from './Operativo_model.js';
import InfoSocAmbient_model from './InfoSocAmbient_model.js';

const UsuarioExterno_model = sequelize.define('usuario_externo', {
    id_usuario_externo: {
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
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
},
    {
        timestamps: true,
    });

// Relación con la tabla Operativo
UsuarioExterno_model.belongsTo(Operativo_model, { foreignKey: 'id_operativo' });

// Relación con la tabla InfoSocAmbient
UsuarioExterno_model.belongsTo(InfoSocAmbient_model, { foreignKey: 'id_info_socambient' });

export default UsuarioExterno_model;
