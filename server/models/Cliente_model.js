import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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
  dni: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  genero: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  contacto: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  provincia: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  localidad: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  domicilio: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  ocupacion: {
    type: DataTypes.STRING(100),
    allowNull: true,
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

// Crear la tabla "Cliente" en la base de datos
Cliente_model.sync({ force: false }).then(() => {
  // console.log('Tabla "Cliente" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "Cliente":', error);
});


export default Cliente_model;
