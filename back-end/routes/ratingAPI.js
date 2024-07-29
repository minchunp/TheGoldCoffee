var express = require('express');
var axios = require('axios');
var router = express.Router();
module.exports = router;


var modelRatings = require("../models/Rating");

// Lấy danh sách tấc cả rating
// ratingsAPI/listRatings
router.get('/listRatings', async function(req, res, next) {
    var data = await modelRatings.find();
    res.json(data);
});
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });