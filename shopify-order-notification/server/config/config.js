require('dotenv').config();

// Shopify API Configurations
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI;

// Email credentials for sending notifications
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Configuration object to be used in the app
const config = {
  shopify: {
    apiKey: SHOPIFY_API_KEY,
    store: SHOPIFY_STORE,
    apiSecret: SHOPIFY_API_SECRET,
    accessToken: SHOPIFY_ACCESS_TOKEN
  },
  mongo: {
    uri: MONGO_URI
  },
  email: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
};

module.exports = config;
