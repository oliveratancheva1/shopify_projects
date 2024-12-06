const express = require('express');
const mongoose = require('mongoose');
const loyaltyRoutes = require('./routes/loyaltyRoutes');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Use loyalty routes
app.use('/api', loyaltyRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Set up server to listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
