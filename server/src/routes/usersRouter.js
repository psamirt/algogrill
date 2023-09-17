const express = require('express');
const router = express.Router();
const { createUser, updateUser } = require('../controllers/usersController');

//------------ nuevo usuario --------------
router.post('/newUser', createUser);
router.put('/updateUser/:id', updateUser)

module.exports = router;
