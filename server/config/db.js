import Sequelize from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false, // Evita que aparezcan las consultas SQL en la consola
});

export default sequelize;