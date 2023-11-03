const express = require('express');
const { createSession,
     captureOrder
     } = require('../controllers/paymentController');
const router = express.Router();

router.get('/createSession', createSession)
router.get('/success', captureOrder)
router.get('/cancel', (req,res)=> res.send('cancel'))

module.exports = router;
