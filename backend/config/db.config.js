// config/db.js

import "dotenv/config";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();

    console.log("Connected to MySQL");

    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

testConnection();

export default pool;
