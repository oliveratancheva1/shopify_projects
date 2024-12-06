const express = require('express');
const router = express.Router();
const loyaltyController = require('../loyaltyController');

// Route to get customer loyalty points
router.get('/loyalty/:customerId', async (req, res) => {
  try {
    const points = await loyaltyController.getCustomerLoyaltyPoints(req.params.customerId);
    res.json({ points });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch points' });
  }
});

// Route to update customer loyalty points
router.post('/loyalty/:customerId', async (req, res) => {
  try {
    const { points } = req.body;
    await loyaltyController.updateLoyaltyPoints(req.params.customerId, points);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update points' });
  }
});

module.exports = router;
