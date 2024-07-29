var express = require('express');
var router = express.Router();

const userController = require('../controllers/usersController');

router.get('/listuser', userController.index);

router.get('/delete/:id', userController.delete);

module.exports = router;
