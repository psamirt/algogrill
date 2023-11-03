require('dotenv').config();
const { HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } = process.env;
const axios = require('axios');
// const Order = require('../database/models/order');

const createSession = async (req, res) => {
  try {
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '100.00'
          }
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

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    return res.json(response.data);
  } catch (error) {
    console.error('Error al crear la sesión:', error);
    return res.status(500).json('Error al crear la sesión');
  }
};




const captureOrder = async (req, res) => {
  const { token } = req.query;
  // const {userId} = req.params
  // const {products, shippingAddress} = req.body

  try {
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
      console.log(response.data);
      return res.send('payed')
    // const orderDataFromPayPal = response.data; 

    // // Crear un nuevo objeto Order usando el modelo y la información del pago
    // const nuevoPedido = new Order({
    //   userId: userId, // Reemplaza esto con la forma correcta de obtener el ID del usuario
    //   products: products, // Ajusta esto según la estructura de los productos
    //   // status: 'pendiente', // Puedes establecer un estado inicial según tus necesidades
    //   shippingAddress: shippingAddress, // Ajusta esto según la estructura del objeto de dirección
    //   paymentInfo: {
    //     paymentId: orderDataFromPayPal.id,
    //     paymentStatus: orderDataFromPayPal.status,
    //   }
    // });

    // await nuevoPedido.save();
    // console.log('Pedido guardado en la base de datos:', nuevoPedido);

    // return res.status(200).send('Pago exitoso');
  } catch (error) {
    console.error('Error al capturar el pedido:', error);
    return res.status(500).send('Error al capturar el pedido');
  }
};

module.exports = {
  createSession,
  captureOrder
};
