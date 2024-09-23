const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const productRoutes = require("./src/routes/userRoutes")
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', productRoutes);

// Listen to the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});