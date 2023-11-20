import { Router } from 'express';
const router = Router();

import {
  getPayed,
  getSalesByDay,
  getTopSellingProducts,
  getTotalProductsSold
} from '../controllers/dashboardController.js';

router.get('/getPayed', getPayed);
router.get('/getSalesByDay', getSalesByDay);
router.get('/getTopSellingProducts', getTopSellingProducts);
router.get('/getTotalProductsSold', getTotalProductsSold);

export default router;
