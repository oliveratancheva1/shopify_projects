const Shopify = require('shopify-api-node');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const config = require('../config/config');

// Initialize Shopify API
const shopify = new Shopify({
  shopName: config.shopify.store,
  apiKey: config.shopify.apiKey,
  password: config.shopify.accessToken
});

// Create a subscription for a product
const createSubscription = async (subscriptionData) => {
  try {
    const { productId, customerEmail, subscriptionPlan } = subscriptionData;

    // Create customer in Stripe
    const customer = await stripe.customers.create({
      email: customerEmail,
    });

    // Create subscription in Stripe
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: subscriptionPlan.priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    // Save the subscription details to Shopify or your database
    const newSubscription = await shopify.customer.create({
      email: customerEmail,
      tags: `Subscription-${subscription.id}`,
    });

    return { success: true, subscriptionId: subscription.id, customerEmail: customerEmail };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error('Failed to create subscription');
  }
};

// Cancel a subscription
const cancelSubscription = async (cancelData) => {
  try {
    const { subscriptionId } = cancelData;

    // Cancel the subscription in Stripe
    await stripe.subscriptions.del(subscriptionId);

    return { success: true, message: 'Subscription canceled successfully' };
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw new Error('Failed to cancel subscription');
  }
};

// Process a subscription payment
const processPayment = async (paymentData) => {
  try {
    const { subscriptionId, paymentMethodId } = paymentData;

    // Retrieve subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Confirm payment for the subscription
    const paymentIntent = await stripe.paymentIntents.confirm(paymentMethodId);

    return { success: true, paymentStatus: paymentIntent.status };
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error('Failed to process payment');
  }
};

module.exports = { createSubscription, cancelSubscription, processPayment };
