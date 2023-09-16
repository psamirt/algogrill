const Products = require('../database/models/product');

const postProduct = async (req, res) => {
  try {
    const {
      product_type,
      product_name,
      product_version,
      image,
      price,
      description,
      disable,
      offers,
      rating
    } = req.body;

    const newProduct = new Products({
      product: [
        {
          product_type,
          product_name,
          product_version,
          image,
          price,
          description,
          disable,
          offers,
          rating
        }
      ]
    });

    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Error al crear producto');
  }
};

const getProducts = async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      const findProduct = await Products.findOne({
        'product.product_name': name
      });
      if (!findProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      return res.status(200).json(findProduct);
    } else {
      const allProducts = await Products.find();
      res.status(200).json(allProducts);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al obtener los productos');
  }
};



module.exports = {
  postProduct,
  getProducts,
};
