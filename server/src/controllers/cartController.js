const Cart = require('../database/models/cart');
const Products = require('../database/models/product');

const addToCart = async (req, res) => {
  try {
    const { product, quantity, userId } = req.body;
    const foundProduct = await Products.findById(product);
    if (!foundProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [
          {
            product: foundProduct,
            quantity
          }
        ]
      });
      await newCart.save();
      return res.status(200).json({ message: 'Producto añadido al carrito' });
    }
    const existingCartItem = cart.items.find(
      (item) => item.product._id.toString() === product._id.toString()
    );
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.items.push({
        product: foundProduct,
        quantity
      });
    }
    await cart.save();
    return res.status(200).json({ message: 'Producto añadido al carrito' });
  } catch (error) {
    res.status(500).json({ error });
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
      return res.status(404).json({
        message: 'Carrito no encontrado para el usuario especificado'
      });
    }
    return res.status(200).json(findUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al encontrar el carrito');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Debe iniciar sesión' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado para el usuario especificado' });
    }

    const updatedItems = cart.items.filter((item) => item.product._id.toString() !== productId);
    cart.items = updatedItems;
    await cart.save();

    return res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el producto del carrito');
  }
};

module.exports = {
  addToCart,
  getCart,
  deleteProduct,
};
