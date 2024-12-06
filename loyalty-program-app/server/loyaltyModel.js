const mongoose = require('mongoose');

// Define schema for loyalty points
const loyaltySchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  email: { type: String, required: true }
});

// Model for loyalty data
const Loyalty = mongoose.model('Loyalty', loyaltySchema);

const findCustomerPoints = async (customerId) => {
  return await Loyalty.findOne({ customerId });
};

const addPoints = async (customerId, pointsToAdd) => {
  let customer = await Loyalty.findOne({ customerId });
  if (!customer) {
    customer = new Loyalty({ customerId, points: 0, email: 'unknown' });
  }
  customer.points += pointsToAdd;
  await customer.save();
};

module.exports = { findCustomerPoints, addPoints };
