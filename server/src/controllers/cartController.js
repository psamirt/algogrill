const Cart = require('../database/models/cart');

const addToCart = async (req, res) => {
  try {
    const { product, quantity, userId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ product, quantity }] });
    } else {
      const existingItemIndex = cart.items.findIndex(item => item.product._id.equals(product._id));
      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ message: 'El parámetro userId es requerido' });
    }
    const findUser = await Cart.findOne({
      userId: userId
    });
    if (!findUser) {
      return res
        .status(404)
        .json({
          message: 'Carrito no encontrado para el usuario especificado'
        });
    }
    return res.status(200).json(findUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al encontrar el carrito');
  }
};

module.exports = {
  addToCart,
  getCart
};
