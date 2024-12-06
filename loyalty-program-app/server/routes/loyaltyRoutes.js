const express = require('express');
const router = express.Router();
const loyaltyController = require('../server/loyaltyController');

// Route to get customer loyalty points by customerId
router.get('/loyalty/:customerId', async (req, res) => {
  try {
    // Extract customerId from route parameters
    const customerId = req.params.customerId;

    // Get customer loyalty points
    const points = await loyaltyController.getCustomerLoyaltyPoints(customerId);

    // Return the points in JSON format
    res.json({ points });
  } catch (error) {
    // If an error occurs, send a 500 status with an error message
    res.status(500).json({ error: 'Failed to fetch points' });
  }
});

// Route to update customer loyalty points
router.post('/loyalty/:customerId', async (req, res) => {
  try {
    // Extract customerId from route parameters
    const customerId = req.params.customerId;

    // Extract points to add from the request body
    const { points } = req.body;

    // Update the loyalty points for the customer
    await loyaltyController.updateLoyaltyPoints(customerId, points);

    // Send a success response
    res.json({ success: true });
  } catch (error) {
    // If an error occurs, send a 500 status with an error message
    res.status(500).json({ error: 'Failed to update points' });
  }
});

module.exports = router;
