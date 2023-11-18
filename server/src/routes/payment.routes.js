import { Router } from 'express';
import {
  createOrder, getPayed, receiveWebhook
} from '../controllers/paymentController.js';
const router = Router();

router.post('/createOrder/:userId', createOrder);

router.post('/webHook', receiveWebhook);

router.get('/getPayed', getPayed)

export default router;
