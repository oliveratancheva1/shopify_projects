const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Route to create a new subscription
router.post('/create', async (req, res) => {
  try {
    const subscription = await subscriptionController.createSubscription(req.body);
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// Route to cancel a subscription
router.post('/cancel', async (req, res) => {
  try {
    const cancelResult = await subscriptionController.cancelSubscription(req.body);
    res.json(cancelResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// Route to handle subscription payments
router.post('/charge', async (req, res) => {
  try {
    const paymentResult = await subscriptionController.processPayment(req.body);
    res.json(paymentResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process payment' });
  }
});

module.exports = router;
