const client = require('../config/db'); // Adjust the path accordingly

// Create the users table
const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      role VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await client.query(query);
    console.log('Users table created successfully.');
  } catch (error) {
    console.error('Error creating users table:', error.stack);
  } finally {
    client.end(); // Close the connection
  }
};

// Call the function to create the table
createUsersTable();