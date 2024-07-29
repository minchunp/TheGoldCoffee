var express = require('express');
var router = express.Router();

const cartController = require('../controllers/cartsController');

router.get('/listcart', cartController.index);


module.exports = router;
