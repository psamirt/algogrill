const express = require('express');
const { createSession } = require('../controllers/paymentController');
const router = express.Router();

router.get('/create-checkout-session', createSession)
router.get('/success', (req,res)=> res.send('success'))
router.get('/cancel', (req,res)=> res.send('cancel'))

module.exports = router;
