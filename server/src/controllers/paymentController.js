import dotenv from 'dotenv';
dotenv.config();
import mercadopago from 'mercadopago';
import Order from '../database/models/order.js';
import Cart from '../database/models/cart.js';
const { ACCESS_TOKEN } = process.env;

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: ACCESS_TOKEN
  });
  const result = await mercadopago.preferences.create({
    items: [
      {
        title: 'algo',
        unit_price: 10,
        currency_id: 'PEN',
        quantity: 1
      }
    ],
    back_urls: {
      success: 'http://localhost:3000/order/success',
      failure: 'http://localhost:3000/order/failure',
      pending: 'http://localhost:3000/order/pending'
    },
    notification_url: 'https://20bc-38-25-13-183.ngrok.io/order/webHook'
  });
  res.send(result.body);
};

export const receiveWebhook = async (req, res) => {
 try {
    const payment = req.query;

    if (payment.type === 'payment') {
      const data = await mercadopago.payment.findById(payment['data.id']);
      console.log(data);
    }
  
    res.send('webhook');
 } catch (error) {
    res.status(500).json({error: error.message})
 }
};
