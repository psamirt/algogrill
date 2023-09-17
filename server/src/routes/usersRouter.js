const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/usersController');

//------------ nuevo usuario --------------
router.post('/newUser', createUser);

module.exports = router;
