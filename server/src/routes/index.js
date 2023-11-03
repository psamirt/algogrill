const express = require('express');
const router = express.Router();
const rutaProductos = require('./productsRouter');
const rutaCart = require('./cartRoutes');
// const rutaOrder = require('./payment.routes');

router.use('/products', rutaProductos);
router.use('/cart', rutaCart);
// router.use('/order', rutaOrder);

module.exports = router;
