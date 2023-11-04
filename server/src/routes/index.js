import { Router } from 'express';
const router = Router();
import  rutaProductos  from './productsRouter.js';
import  rutaCart  from './cartRoutes.js';
import  rutaOrder  from './payment.routes.js';

router.use('/products', rutaProductos);
router.use('/cart', rutaCart);
router.use('/order', rutaOrder);

export default router;
