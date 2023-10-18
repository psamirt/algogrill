const express = require('express');
const router = express.Router();

const { addToCart, getCart } = require('../controllers/cartController');

router.post('/addToCart', addToCart);
router.get('/getCart/:userId', getCart);

module.exports = router;
