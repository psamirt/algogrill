const express = require('express');
const router = express.router();
const {
  postProduct,
  getProducts
} = require('../controllers/productsController');

//------------ productos nuevos para el admin --------------
router.post('/newProduct', postProduct);

//-----------obtener productos -------------
router.get('/getAllProducts', getProducts);

module.exports = router;
