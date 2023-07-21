import Sequelize from 'sequelize';

const sequelize = new Sequelize('proyecto_pas', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Evita que aparezcan las consultas SQL en la consola
});

try {
  await sequelize.authenticate();
  console.log('Conexion exitosa.');
} catch (error) {
  console.error('No es posible conectarse a la DB:', error);
}

export default sequelize;