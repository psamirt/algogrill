const express = require('express');
const router = express.Router();
const rutaProductos = require('./productsRouter');
const rutaCart = require('./cartRoutes');

router.use('/products', rutaProductos);
router.use('/cart', rutaCart);

module.exports = router;
