const nodemailer = require('nodemailer');
const shopifyApi = require('shopify-api-node');
const OrderModel = require('../models/orderModel');
const config = require('../config/config');

// Create a Shopify instance to interact with the store's orders
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

const sendOrderNotification = async (orderId) => {
  // Fetch order details from Shopify
  const order = await shopify.order.get(orderId);
  
  // Prepare the email content
  const mailOptions = {
    from: config.email.user,
    to: order.email,
    subject: 'Your Order Status',
    text: `Hello, your order #${orderId} has been placed successfully. The current status is: ${order.fulfillment_status}.`
  };

  // Send email notification to the customer
  await transporter.sendMail(mailOptions);
  console.log(`Order notification sent to ${order.email}`);
};

const getOrderDetails = async (orderId) => {
  // Fetch order details from the database (optional to fetch from Shopify API)
  const order = await OrderModel.findOne({ orderId });
  return order;
};

module.exports = { sendOrderNotification, getOrderDetails };
