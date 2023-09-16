const express = require("express");
const router = express.Router();
const rutaProductos = require('./productsRouter')

router.use('products', rutaProductos)

module.exports = router