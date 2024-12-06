const RecommendationModel = require('../models/recommendationModel');
const shopifyApi = require('shopify-api-node');

// Create a Shopify instance to interact with the store's products
const shopify = new shopifyApi({
  shopName: process.env.SHOPIFY_STORE,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_ACCESS_TOKEN
});

const getProductRecommendations = async (customerId) => {
  const recommendations = await RecommendationModel.getRecommendationsByCustomerId(customerId);
  if (recommendations) {
    return recommendations.products;
  }
  
  // If no previous data, fetch popular products
  const popularProducts = await shopify.product.list({ limit: 5 });
  return popularProducts;
};

const updateCustomerRecommendations = async (customerId, productId) => {
  await RecommendationModel.updateRecommendations(customerId, productId);
};

module.exports = { getProductRecommendations, updateCustomerRecommendations };
