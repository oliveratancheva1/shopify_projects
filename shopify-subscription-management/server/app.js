const express = require('express');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Use subscription routes
app.use('/api/subscriptions', subscriptionRoutes);

// Set up server to listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
