const mongoose = require('mongoose');

// Schema for storing product recommendations data
const recommendationSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

// Model for storing recommendations
const Recommendation = mongoose.model('Recommendation', recommendationSchema);

const getRecommendationsByCustomerId = async (customerId) => {
  return await Recommendation.findOne({ customerId });
};

const updateRecommendations = async (customerId, productId) => {
  let recommendation = await Recommendation.findOne({ customerId });
  if (!recommendation) {
    recommendation = new Recommendation({ customerId, products: [] });
  }
  recommendation.products.push(productId);
  await recommendation.save();
};

module.exports = { getRecommendationsByCustomerId, updateRecommendations };
