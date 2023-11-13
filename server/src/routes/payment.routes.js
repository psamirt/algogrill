import { Router } from 'express';
import {
  createOrder, receiveWebhook
} from '../controllers/paymentController.js';
const router = Router();

router.post('/createOrder/:userId', createOrder);

router.post('/webHook', receiveWebhook);

export default router;
