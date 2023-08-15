import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import InfoSocAmbient_model from './InfoSocAmbient_model.js';

const Cliente_model = sequelize.define('cliente', {
  id_cliente: {
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
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
},
  {
    tableName: 'cliente',
    timestamps: true,
  });

// Relación con la tabla InfoSocAmbient
Cliente_model.belongsTo(InfoSocAmbient_model, { foreignKey: 'id_info_socambient' });

// Crear la tabla "Cliente" en la base de datos
Cliente_model.sync().then(() => {
  // console.log('Tabla "Cliente" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "Cliente":', error);
});



export default Cliente_model;
