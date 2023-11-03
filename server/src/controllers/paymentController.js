require('dotenv').config();
const { HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } = process.env;
const axios = require('axios');
const Order = require('../database/models/order');
const Cart = require('../database/models/cart');

const createSession = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json('El carrito está vacío.');
    }

    const items = cart.items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      unit_amount: {
        currency_code: 'PEN',
        value: item.product.price.toFixed(2)
      }
    }));

    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'PEN',
            value: items
              .reduce(
                (total, item) => total + item.quantity * item.unit_amount.value,
                0
              )
              .toFixed(2)
          },
          items
        }
      ],
      application_context: {
        brand_name: 'Algo Grill',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${HOST}/order/success`,
        cancel_url: `${HOST}/order/cancel`
      }
    };

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const {
      data: { access_token }
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET
      }
    });

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error('Error al crear la sesión:', error);
    return res.status(500).json('Error al crear la sesión');
  }
};

const captureOrder = async (req, res) => {
  const { token } = req.query;
  const { userId } = req.params;
  const { shippingAddress } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json('El carrito está vacío.');
    }

    const products = cart.items.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity
    }));

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET
        }
      }
    );
    const orderDataFromPayPal = response.data;

    const nuevoPedido = new Order({
      userId: userId,
      products: products,
      status: 'pendiente',
      shippingAddress: shippingAddress,
      paymentInfo: orderDataFromPayPal
    });

    await nuevoPedido.save();
    await Order.findByIdAndUpdate(nuevoPedido._id, { $set: { status: 'aceptado' } });
    console.log('Pedido guardado en la base de datos:', nuevoPedido);
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    return res.status(200).send('Pago exitoso');
  } catch (error) {
    console.error('Error al capturar el pedido:', error);
    return res.status(500).send('Error al capturar el pedido');
  }
};

module.exports = {
  createSession,
  captureOrder
};
