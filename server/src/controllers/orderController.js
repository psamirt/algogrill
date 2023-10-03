const Order = require('../database/models/order');

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      status,
      shippingAddress,
      paymentInfo,
      orderTotal,
      customerNotes,
      additional
    } = req.body;

    const newOrder = new Order({
      userId,
      products,
      status,
      shippingAddress,
      paymentInfo,
      orderTotal,
      customerNotes,
      additional
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear la orden');
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las ordenes del usuario');
  }
};

module.exports = {
  createOrder,
  getOrdersByUser
};
