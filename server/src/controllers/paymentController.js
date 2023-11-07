import dotenv from 'dotenv';
dotenv.config();
import mercadopago from 'mercadopago';
import Order from '../database/models/order.js';
import Cart from '../database/models/cart.js';
const { ACCESS_TOKEN } = process.env;

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    console.log(cart)

    const items = cart.items.map((item) => ({
      title: item.product.product_name,
      unit_price: parseFloat(item.product.price.toFixed(2)),
      quantity: item.quantity
    }));

    mercadopago.configure({
      access_token: ACCESS_TOKEN
    });

    const totalAmount = items.reduce((total, item) => total + item.unit_price * item.quantity, 0);

    const preference = {
      items: items,
      back_urls: {
        success: 'http://localhost:3000/order/success',
        failure: 'http://localhost:3000/order/failure',
        pending: 'http://localhost:3000/order/pending'
      },
      notification_url: 'https://cb3d-38-25-13-183.ngrok.io/order/webHook',
      total_amount: parseFloat(totalAmount.toFixed(2))
    };

    const result = await mercadopago.preferences.create(preference);
    res.send(result.body);
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al crear la orden');
  }
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
    res.status(500).json({ error: error.message });
  }
};
