const nodemailer = require('nodemailer');
const shopifyApi = require('shopify-api-node');
const InventoryModel = require('../models/inventoryModel');
const config = require('../config/config');

// Create a Shopify instance to interact with the store's products
const shopify = new shopifyApi({
  shopName: config.shopify.store,
  apiKey: config.shopify.apiKey,
  password: config.shopify.accessToken
});

// Create a transporter for sending emails via NodeMailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

const checkLowStock = async () => {
  const products = await shopify.product.list({ limit: 250 });

  let lowStockItems = [];
  for (let product of products) {
    if (product.variants.some(variant => variant.inventory_quantity < 10)) {
      lowStockItems.push({
        title: product.title,
        inventory: product.variants.map(variant => ({
          title: variant.title,
          inventory_quantity: variant.inventory_quantity
        }))
      });
    }
  }

  if (lowStockItems.length > 0) {
    await sendLowStockNotification(lowStockItems);
  }

  return lowStockItems;
};

const sendLowStockNotification = async (lowStockItems) => {
  const mailOptions = {
    from: config.email.user,
    to: 'store-owner@example.com', // The store owner's email address
    subject: 'Low Stock Notification',
    text: `The following items have low stock:\n\n${lowStockItems.map(item => 
      `${item.title}: ${item.inventory.map(variant => `${variant.title} - ${variant.inventory_quantity}`).join(', ')}`
    ).join('\n\n')}`
  };

  // Send the low stock notification email to the store owner
  await transporter.sendMail(mailOptions);
  console.log('Low stock notification sent to the store owner.');
};

const getInventory = async () => {
  const products = await shopify.product.list({ limit: 250 });
  return products.map(product => ({
    title: product.title,
    inventory: product.variants.map(variant => ({
      title: variant.title,
      inventory_quantity: variant.inventory_quantity
    }))
  }));
};

module.exports = { checkLowStock, getInventory };
