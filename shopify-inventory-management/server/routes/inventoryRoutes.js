const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Route to check and notify low stock items
router.get('/inventory/notify', async (req, res) => {
  try {
    const lowStockItems = await inventoryController.checkLowStock();
    res.json({ lowStockItems });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check low stock' });
  }
});

// Route to get inventory levels
router.get('/inventory', async (req, res) => {
  try {
    const inventory = await inventoryController.getInventory();
    res.json({ inventory });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

module.exports = router;
