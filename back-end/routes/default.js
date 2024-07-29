var express = require('express');
var router = express.Router();

const productController = require('../controllers/productsController');

router.get('/', productController.index);



module.exports = router;