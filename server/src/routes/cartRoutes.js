const express = require('express');
const router = express.Router();

const { addToCart, getCart, deleteProduct } = require('../controllers/cartController');

router.post('/addToCart', addToCart);
router.get('/getCart/:userId', getCart);
router.delete('/deleteProduct/:userId', deleteProduct);

module.exports = router;
