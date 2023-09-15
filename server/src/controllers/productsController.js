const ProductsSchema = require('../database/models/product');

const postProduct = async (req, res) => {
  try {
    const {
      product_name,
      image,
      price,
      description,
      disable,
      offers,
      favorite,
      rating,
      additional
    } = req.body;

    const newProduct = new ProductsSchema({
      product_name,
      image,
      price,
      description,
      disable,
      offers,
      favorite,
      rating,
      additional
    });

    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al crear producto');
  }
};

const getProducts = async (req, res) => {
  console.log(req);
  try {
    const allProducts = await ProductsSchema.find();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al obtener los productos');
  }
};

module.exports = { postProduct, getProducts };
