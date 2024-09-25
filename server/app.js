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
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});