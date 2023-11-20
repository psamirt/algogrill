import { Router } from 'express';
const router = Router();
import rutaProductos from './productsRouter.js';
import rutaCart from './cartRoutes.js';
import rutaOrder from './payment.routes.js';
import rutaDashboard from './dashboardRouter.js';

router.use('/products', rutaProductos);
router.use('/cart', rutaCart);
router.use('/order', rutaOrder);
router.use('/dashboard', rutaDashboard);

export default router;
