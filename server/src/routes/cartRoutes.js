const express = require('express');
const router = express.Router();

const { addToCart, getCart, deleteProduct, updateQuantity } = require('../controllers/cartController');

router.post('/addToCart', addToCart);
router.get('/getCart/:userId', getCart);
router.delete('/deleteProduct/:userId', deleteProduct);
router.put('/updateQuantity/:userId', updateQuantity);

module.exports = router;
