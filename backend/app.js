
// Import Core Dependencies
import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

// Import database connection
import pool from "./config/db.config.js"
// Initialize Express App
const app = express();

// Port
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routs
import installRoutes from "./routs/install.routes.js";
import employeeRoutes from "./routs/employee.routes.js";
import authRoutes from "./routs/auth.routes.js";

// middlwares
app.use("/", installRoutes);
app.use("/api", employeeRoutes);
app.use("/api/auth", authRoutes);
// Start server only if DB connect
async function start() {
  try {
    // Test database connection
    await pool.execute("SELECT 1");
    console.log("✅ Database connected successfully");

    // Optional: Show all tables in the database
    const [tables] = await pool.execute("SHOW TABLES");
    console.log("📋 Tables are created in database:");

    // Start server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error.message);
  }
}

start();