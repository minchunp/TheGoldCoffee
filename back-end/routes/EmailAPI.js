var express = require('express');
var router = express.Router();

router.post("/send-mail", async function(req, res, next){
    try{
      const {to, subject, content} = req.body;
  
      const mailOptions = {
        from: "cuonglmps27862@fpt.edu.vn",
        to: to,
        subject: subject,
        html: content
      };
      await sendMail.transporter.sendMail(mailOptions);
      res.json({ status: 1, message: "Gửi mail thành công"});
    }catch(err){
      res.json({ status: 0, message: "Gửi mail thất bại"});
    }
  });
  
module.exports = router;
