import dotenv from 'dotenv';
dotenv.config();
import mercadopago from 'mercadopago';
import Order from '../database/models/order.js';
import Cart from '../database/models/cart.js';
const { ACCESS_TOKEN } = process.env;

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { address, phoneNumber, reference } = req.body;

    const cart = await Cart.findOne({ userId });

    if (cart) {
      const items = cart.items.map((item) => ({
        id: item.product._id,
        category_id: item.product.product_type,
        description: item.product.description,
        title: item.product.product_name,
        quantity: item.quantity,
        unit_price: parseFloat(item.product.price.toFixed(2))
      }));

      const totalAmount = items.reduce(
        (total, item) => total + item.unit_price * item.quantity,
        0
      );

      const userDetails = {
        address,
        phoneNumber,
        reference
      };

      const order = new Order({
        cartId: cart._id,
        userId,
        orderNumber: Math.random().toString(36).substring(7),
        userDetails,
        total_amount: parseFloat(totalAmount.toFixed(2))
      });

      await order.save();

      mercadopago.configure({
        access_token: ACCESS_TOKEN
      });

      let preference = {
        items: items,
        back_urls: {
          success: 'https://algogrill.vercel.app/success',
          failure: 'https://algogrill.vercel.app/failure',
          pending: 'https://algogrill.vercel.app/pending'
          // success: 'http://localhost:5173/success'
          // failure: 'http://localhost:5173/failure',
          // pending: 'http://localhost:5173/pending'
        },
        notification_url: `https://algo-grill.onrender.com/order/webHook`,
        // notification_url: `https://33ea-38-25-13-183.ngrok.io/order/webHook`,
        total_amount: parseFloat(totalAmount.toFixed(2)),
        auto_return: 'approved',
        metadata: { userId: userId, cartId: cart._id }
      };

      const result = await mercadopago.preferences.create(preference);

      if (order.status === 'pending') {
        setTimeout(async () => {
          const updatedOrder = await Order.findOneAndUpdate(
            { _id: order._id, status: 'pending' },
            { status: 'cancelled' },
            { new: true }
          );
          if (updatedOrder) {
            await Order.findOneAndRemove({ _id: order._id });
          }
        }, 5 * 60 * 1000);
      }

      res.send(result.body);
    } else {
      res.status(404).json('Carrito no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al crear la orden');
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;

    if (payment.type === 'payment') {
      const paymentDetails = await mercadopago.payment.findById(
        payment['data.id']
      );
      const userId = paymentDetails.body.metadata.user_id;
      const cartId = paymentDetails.body.metadata.cart_id;

      if (cartId) {
        await Order.findOneAndUpdate(
          { cartId: cartId },
          { status: 'payed', paymentInfo: paymentDetails.body },
          { new: true }
        );
      }

      await Cart.findOneAndRemove({ userId });
    }

    res.send('webhook');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
