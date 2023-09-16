const express = require('express');
const router = express.Router();
const {
  postProduct,
  getProducts,
  getById,
  deleteById,
  updateProduct
} = require('../controllers/productsController');

//------------ productos nuevos para el admin --------------
router.post('/newProduct', postProduct);

// -----------obtener productos -------------
router.get('/getAllProducts', getProducts);
router.get('/productId', getById);
router.get('/deleteId', deleteById);
router.put('/upDateProduct/:id', updateProduct);

module.exports = router;
