import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcrypt';

const Usuario_model = sequelize.define('usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    unique: true,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  token: {
    type: DataTypes.STRING,
  },
  confirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
},
  {
    tableName: 'usuario',
    timestamps: true,
  });

// Agregar el código para crear la tabla si aún no existe
Usuario_model.sync({ force: false }).then(() => {
  // console.log('Tabla "usuarios" creada exitosamente.');
}).catch((error) => {
  console.log('Error al crear la tabla "usuarios":', error);
});

Usuario_model.beforeCreate(async (usuario) => {
  const salt = await bcrypt.genSalt(10); // metodo genSalt genera el hash - 10 son las rondas esa es la por defecto para que sea seguro el hash
  // luego que se genera ese salt accede a todos los datos que se estan mandando para guardar en la BD
  usuario.password = await bcrypt.hash(usuario.password, salt); // THIS HACE REFERENCIA AL OBJETO DEL USUARIO
  // lo que hace la sentencia anterior es hashear el password, el metodo toma dos parametros 
  // this.password es el string sin hashear y el salt que es el valor que produjo la generacion del salt
});

Usuario_model.prototype.comprobarPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

export default Usuario_model;
