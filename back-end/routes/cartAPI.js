var express = require('express');
var axios = require('axios');
var router = express.Router();
module.exports = router;


var modelCart = require("../models/Cart");

// Lấy danh sách tấc cả đơn hàng
// cartsAPI/listCarts
router.get('/listCarts', async function(req, res, next) {
    var data = await modelCart.find();
    res.json(data);
});