const { HOST, PAYPAL_APY, PAYPAL_APY_CLIENT, PAYPAL_APY_SECRET } = process.env;
const axios = require('axios');

const createSession = async (req, res) => {
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
      return_url: `${HOST}/success`,
      cancel_url: `${HOST}/cancel`
    }
  };

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  const {
    data: { access_token }
  } = await axios.post(`${PAYPAL_APY}/v1/oauth2/token`, params, {
    auth: {
      username: PAYPAL_APY_CLIENT,
      password: PAYPAL_APY_SECRET
    }
  });
  const response = axios.post(`${PAYPAL_APY}/v2/checkout/orders`, order, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  return res.json(response.data);
};

const captureOrder = async (req, res) => {
  const { token } = req.query;

  const response = await axios.port(
    `${PAYPAL_APY}/v2/checkout/orders${token}/capture`,
    {},
    {
      auth: {
        username: PAYPAL_APY_CLIENT,
        password: PAYPAL_APY_SECRET
      }
    }
  );
  console.log(response.data);
  return res.send('payed');
};

module.exports = {
  createSession,
  captureOrder
};
