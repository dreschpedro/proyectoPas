import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const sequelize = async () => {
  try {
    await pool.connect();
    console.log("Conexión exitosa a PostgreSQL!");
  } catch (error) {
    console.log("Error al conectar a PostgreSQL:", error);
    process.exit(1);
  }
};

export default sequelize;
