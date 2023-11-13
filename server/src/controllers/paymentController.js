import dotenv from 'dotenv';
dotenv.config();
import mercadopago from 'mercadopago';
import Order from '../database/models/order.js';
import Cart from '../database/models/cart.js';
const { ACCESS_TOKEN, WEB_HOOK } = process.env;

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    const items = cart.items.map((item) => ({
      id:item.product._id,
			category_id: item.product.product_type,
			description: item.product.description,
      title: item.product.product_name,
      quantity: item.quantity,
      unit_price: parseFloat(item.product.price.toFixed(2))
    }));

    mercadopago.configure({
      access_token: ACCESS_TOKEN
    });

    const totalAmount = items.reduce((total, item) => total + item.unit_price * item.quantity, 0);

    const preference = {
      items: items,
      back_urls: {
        success: 'http://localhost:5173/success',
        failure: 'http://localhost:5173/failure',
        // pending: 'http://localhost:3000/order/pending'
      },
      notification_url: `https://algo-grill.onrender.com/order/webHook`,
      total_amount: parseFloat(totalAmount.toFixed(2)),
      auto_return: 'approved'
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
