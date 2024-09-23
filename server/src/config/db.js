const { Pool } = require('pg');
require("dotenv").config();
// Configure the connection pool
const pool = new Pool({
  user: process.env.DB_NAME,          // Your PostgreSQL username
  host: process.env.DB_HOST,         // Your PostgreSQL host (use 127.0.0.1 if localhost doesn't work)
  database: process.env.DB_NAME,  // Your PostgreSQL database name
  password: process.env.DB_PASSWORD, // Your PostgreSQL password
  port: process.env.DB_PORT,                
});

// Test the connection
pool.connect((err,client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL!');
  release();
});

module.exports = pool;