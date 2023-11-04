import { Router } from 'express';
const router = Router();
import  rutaProductos  from './productsRouter.js';
import  rutaCart  from './cartRoutes.js';
// const rutaOrder = require('./payment.routes');

router.use('/products', rutaProductos);
router.use('/cart', rutaCart);
// router.use('/order', rutaOrder);

export default router;
