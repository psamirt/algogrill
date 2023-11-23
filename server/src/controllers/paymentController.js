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
        userId,
        items,
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
          success: 'http://localhost:5173/success',
          failure: 'http://localhost:5173/failure',
          pending: 'http://localhost:5173/pending'
        },
        notification_url: `https://algo-grill.onrender.com/order/webHook`,
        total_amount: parseFloat(totalAmount.toFixed(2)),
        auto_return: 'approved',
        metadata: { userId: userId }
      };

      const result = await mercadopago.preferences.create(preference);

      // await Cart.findOneAndRemove({ userId });

      // const latestOrder = await Order.findOne({ userId })
      //   .sort({ createdAt: -1 })
      //   .limit(1);

      // if (latestOrder) {
      //   await Order.findByIdAndUpdate(
      //     { _id: latestOrder._id },
      //     { $set: { status: 'payed' } }
      //   );
      // }

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
      console.log(paymentDetails);

      if (paymentDetails.status === 'approved') {
        const userId = paymentDetails.metadata.order_id;
        console.log(userId);
        const order = await Order.findByIdAndUpdate(
          { userId },
          { $set: { status: 'payed' } }
        );
        await Cart.findOneAndRemove({ userId });

        if (order) {
          console.log('Order updated to payed for user:', userId);
          console.log('Cart deleted for user:', userId);
        } else {
          console.error('Order not found for user:', userId);
        }
      } else {
        console.error('Payment failed:', paymentDetails.status);
      }
    }

    res.send('webhook');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
