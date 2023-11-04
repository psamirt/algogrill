import { Router } from 'express';
const router = Router();

import { addToCart, getCart, deleteProduct, updateQuantity } from '../controllers/cartController.js';

router.post('/addToCart', addToCart);
router.get('/getCart/:userId', getCart);
router.delete('/deleteProduct/:userId', deleteProduct);
router.put('/updateQuantity/:userId', updateQuantity);

export default router;
