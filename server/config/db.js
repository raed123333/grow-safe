const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise"); // Import MySQL2 for creating DB if not exists
require("dotenv").config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const initializeDatabase = async () => {
  try {
    // Connect to MySQL server (without specifying the database)
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(` Database '${DB_NAME}' is ready.`);
  } catch (err) {
    console.error("Database creation failed:", err);
  }
};

// Call the function to create the database
initializeDatabase();

// Now connect Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
