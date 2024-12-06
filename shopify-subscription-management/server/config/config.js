require('dotenv').config();

// Shopify API Configurations
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

// Stripe API for subscription payments
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;

// Configuration object to be used in the app
const config = {
  shopify: {
    apiKey: SHOPIFY_API_KEY,
    store: SHOPIFY_STORE,
    apiSecret: SHOPIFY_API_SECRET,
    accessToken: SHOPIFY_ACCESS_TOKEN
  },
  stripe: {
    apiKey: STRIPE_API_KEY
  }
};

module.exports = config;
