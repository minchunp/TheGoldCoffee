var express = require('express');
var router = express.Router();

const ratingController = require('../controllers/ratingsController');

router.get('/listrating', ratingController.index);

router.get('/delete/:id', ratingController.delete);

module.exports = router;
