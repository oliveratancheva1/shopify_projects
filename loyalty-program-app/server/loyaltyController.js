const LoyaltyModel = require('./loyaltyModel');
const nodemailer = require('nodemailer');

// Send email notification when points are updated
const sendEmailNotification = async (email, points) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password'
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Your Loyalty Points Update',
    text: `You have earned ${points} loyalty points. Keep shopping to earn more!`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const getCustomerLoyaltyPoints = async (customerId) => {
  const customer = await LoyaltyModel.findCustomerPoints(customerId);
  return customer ? customer.points : 0;
};

const updateLoyaltyPoints = async (customerId, points) => {
  await LoyaltyModel.addPoints(customerId, points);
  const customer = await LoyaltyModel.findCustomerPoints(customerId);
  sendEmailNotification(customer.email, points);
};

module.exports = { getCustomerLoyaltyPoints, updateLoyaltyPoints };
