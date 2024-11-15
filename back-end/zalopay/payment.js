// // Node v10.15.3
// const axios = require("axios").default; // npm install axios
// const CryptoJS = require("crypto-js"); // npm install crypto-js
// const qs = require("qs");

// const config = {
//   app_id: "2553",
//   key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
//   key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
//   endpoint: "https://sb-openapi.zalopay.vn/v2/query",
// };

// let postData = {
//   app_id: config.app_id,
//   app_trans_id: "<app_trans_id>", // Input your app_trans_id
// };

// let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
// postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

// let postConfig = {
//   method: "post",
//   url: config.endpoint,
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   data: qs.stringify(postData),
// };

// axios(postConfig)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
