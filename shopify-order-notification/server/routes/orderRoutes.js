const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to send order notification
router.post('/order/:orderId/notify', async (req, res) => {
  try {
    const { orderId } = req.params;
    await orderController.sendOrderNotification(orderId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Route to get order details
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetails = await orderController.getOrderDetails(orderId);
    res.json({ order: orderDetails });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

module.exports = router;
