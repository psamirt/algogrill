const Products = require('../database/models/product');

const postProduct = async (req, res) => {
  try {
    const {
      product_type,
      product_name,
      image,
      price,
      description,
      disable,
      offers,
      rating
    } = req.body;

    const newProduct = new Products({
      product_type,
      product_name,
      image,
      price,
      description,
      disable,
      offers,
      rating
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

const getById = async (req, res) => {
  try {
    const { id } = req.query;
    const productId = await Products.findById(id);
    res.status(200).json(productId);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al obtener el producto');
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.query;
    const deleteProduct = await Products.deleteOne({ _id: id });
    if (deleteProduct.deletedCount === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.status(200).send('Producto eliminado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al eliminar el producto');
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_type,
      product_name,
      image,
      price,
      description,
      disable,
      offers,
      rating
    } = req.body;

    const toUpdate = await Products.findByIdAndUpdate(
      id,
      {
        product: [
          {
            product_type,
            product_name,
            image,
            price,
            description,
            disable,
            offers,
            rating
          }
        ]
      },
      { new: true }
    );

    if (!toUpdate) {
      return res
        .status(404)
        .json({ message: 'No se encontró el producto a actualizar' });
    }

    res.status(200).json(toUpdate);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error al actualizar el producto' });
  }
};

module.exports = {
  postProduct,
  getProducts,
  getById,
  deleteById,
  updateProduct
};
