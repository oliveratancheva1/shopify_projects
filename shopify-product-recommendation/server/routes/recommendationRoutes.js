const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Route to get product recommendations for a customer
router.get('/recommendations/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const recommendations = await recommendationController.getProductRecommendations(customerId);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// Route to update customer recommendation data (used for logging customer behavior)
router.post('/recommendations/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const { productId } = req.body;
    await recommendationController.updateCustomerRecommendations(customerId, productId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recommendations' });
  }
});

module.exports = router;
