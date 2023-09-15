const Products = require('../database/models/product');

const postProduct = async (req, res) => {
  try {
    const {
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
    console.error(error);
    res.status(400).send('Error al crear producto');
  }
};

// const getProducts = async (req, res) => {
//   console.log(req);
//   try {
//     const allProducts = await productSchema.find();
//     res.status(200).json(allProducts);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send('Error al obtener los productos');
//   }
// };

module.exports = { postProduct,
  //  getProducts
   };
