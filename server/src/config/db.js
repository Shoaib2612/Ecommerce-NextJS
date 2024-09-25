const { Pool } = require('pg');
require("dotenv").config();

// Configure the connection pool using the Supabase connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the environment variable for the connection string
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to Postgres');
  release();
});

module.exports = pool;