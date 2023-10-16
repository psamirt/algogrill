const Cart = require('../database/models/cart');

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart
};
