import { Router } from 'express';
import {createOrder, captureOrder} from '../controllers/paymentController.js'
const router = Router();

router.get('/createOrder/:userId', createOrder);
router.get('/success', captureOrder);
router.get('/webHook', (req, res) => res.send('webHook'));

export default router;
