const express = require('express');
const router = express.Router();
const rutaProductos = require('./productsRouter');
const rutaUsers = require('./usersRouter');

router.use('/products', rutaProductos);
router.use('/users', rutaUsers);

module.exports = router;
