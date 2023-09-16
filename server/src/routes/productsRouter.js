const express = require('express');
const router = express.Router();
const {
  postProduct,
  getProducts,
  getById,
  deleteById
} = require('../controllers/productsController');

//------------ productos nuevos para el admin --------------
router.post('/newProduct', postProduct);

// -----------obtener productos -------------
router.get('/getAllProducts', getProducts);
router.get('/productId', getById)
router.get('/deleteId', deleteById)

module.exports = router;

