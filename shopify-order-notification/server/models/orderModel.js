const mongoose = require('mongoose');

// Schema for storing order details
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  fulfillmentStatus: { type: String, required: true }
});

// Model for storing order data
const Order = mongoose.model('Order', orderSchema);

// Find an order by its orderId
const findOrderById = async (orderId) => {
  return await Order.findOne({ orderId });
};

module.exports = { findOrderById };
