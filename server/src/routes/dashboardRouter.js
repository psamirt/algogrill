import { Router } from 'express';
const router = Router();

import {
  getPayed,
  getSalesByDay,
  getTopSellingProducts,
} from '../controllers/dashboardController.js';

router.get('/getPayed', getPayed);
router.get('/getSalesByDay', getSalesByDay);
router.get('/getTopSellingProducts', getTopSellingProducts);

export default router;
