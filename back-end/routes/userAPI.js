var express = require('express');
var axios = require('axios');
var router = express.Router();
module.exports = router;


var modelUsers = require("../models/User");

// Lấy danh sách tấc cả user
// usersAPI/listUsers
router.get('/listUsers', async function(req, res, next) {
    var data = await modelUsers.find();
    res.json(data);
});