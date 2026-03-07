require("dotenv").config();

// Import Core Dependencies
const express = require("express");
const cors = require("cors");

// Import database connection
const dbconnection = require("./config/db.config");

// Initialize Express App
const app = express();

// Port
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routs
const installRoutes = require("../backend/routs/install.routes");
// middlwares
app.use("/", installRoutes);

// Start server only if DB connect
async function start() {
  try {
    // Test database connection
    await dbconnection.execute("SELECT 1");
    console.log("✅ Database connected successfully");

    // Optional: Show all tables in the database
    const [tables] = await dbconnection.execute("SHOW TABLES");
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