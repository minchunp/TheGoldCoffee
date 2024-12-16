const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { transporter } = require("../Email");


let verificationCodes = {};

// const sendVerificationCode = async (req, res) => {
//   try {
//   const { email_user } = req.body;
//   console.log(email_user);
  
//   if (!email_user) {
//     return res.status(400).json({ message: "Email không được để trống" });
//   }
  
//   const existingUser = await User.findOne({ email_user });
//   if (existingUser) {
//     return res.status(400).json({ message: "Email đã được sử dụng!" });
//   }
  
//   const code = Math.floor(100000 + Math.random() * 900000).toString();
//   verificationCodes[email_user] = code;
  
//   await transporter.sendMail ({
//     from: "your-email@fpoly.edu.vn",
//     to: email_user,
//     subject: "Mã xác thực từ The Gold Coffee",
//     text: `Mã xác thực của bạn là: ${code}`,
//   });
  
//   res.status(200).json({status: true , message: "Đã gửi mã xác thực!"});
//   } catch (err) {
//   console.error("Lỗi khi gửi mã xác thực:", err);
//   res.status(500).json({ message: "Lỗi hệ thống khi gửi mã xác thực!", error: err.message });
//   }
//   };

const sendVerificationCode = async (req, res) => {
  try {
    const { email_user, action,code: verificationCode  } = req.body; // acction để phân biệt giữa việc tạo tài khoản hoặc quên passw
    // console.log(email_user, action);
    
    if (action === '?' )  {
      console.log('OTP: ',verificationCode);
      
    }

    if (!email_user) {
      return res.status(400).json({ message: "Email không được để trống" });
    }

    const existingUser = await User.findOne({ email_user });
    if(action === "register"){
      if (existingUser) {
        return res.status(400).json({ message: "Email đã được sử dụng!" });
      }
      
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      verificationCodes[email_user] = code;

    
      

      await transporter.sendMail ({
        from: "your-email@fpoly.edu.vn",
        to: email_user,
        subject: "Mã xác thực từ The Gold Coffee",
        text: `Mã xác thực của bạn là: ${code}`,
      });

      res.status(200).json({status: true , message: "Đã gửi mã xác thực!"});
    } else if (action === "forgot"){
      if(!existingUser){
        return res.status(400).json({message: "Email này chưa được đăng ký"});
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      verificationCodes[email_user] = code;

      console.log('verify: ' , verificationCodes);
      
      await transporter.sendMail ({
        from: "your-email@fpoly.edu.vn",
        to: email_user,
        subject: "Mã xác thực từ The Gold Coffee",
        text: `Mã xác thực của bạn là: ${code}`,
      });
      res.status(200).json({status: true , message: "Đã gửi mã xác thực!"});
    } else if (action === "?"){
      if (!verificationCodes[email_user]) {
        return res.status(400).json({ message: "Mã xác thực không tồn tại hoặc đã hết hạn!" });
      }

      console.log('verify code in ?: ' , verificationCodes);
      if (verificationCodes[email_user] === verificationCode) {
        delete verificationCodes[email_user];

        return res.status(200).json({message: " Mã xác minh đã được dùng!"});
      } else {
        return res.status(400).json({message: "Mã xác minh sai"})
      }
    } 
    else {
      return res.status(400).json({message: "Lỗi ở BE không hoạt động!!!"})
    }
  } catch (err) {
    console.error("Lỗi khi gửi mã xác thực:", err);
    res.status(500).json({ message: "Lỗi hệ thống khi gửi mã xác thực!", error: err.message });
  }
};



const register = async (req, res) => {
  try {
    const { name_user, email_user, pass_user, code } = req.body;

    // Kiểm tra nếu mã xác thực tồn tại cho email này
    if (!verificationCodes[email_user]) {
      return res.status(400).json({ message: "Mã xác thực không tồn tại hoặc đã hết hạn!" });
    }

    // Kiểm tra nếu mã xác thực khớp
    if (verificationCodes[email_user] !== code) {
      return res.status(400).json({ message: "Mã xác thực không chính xác!" });
    }

    // Mã xác thực đúng, tiến hành đăng ký người dùng
    const hashedPassword = await bcrypt.hash(pass_user, 10);

    // Create user
    const user = new User({
      name_user,
      email_user,
      phoneNumber_user:"",
      pass_user: hashedPassword,
      address_user:"",
      role_user:"user",
      status_user:1,
      tokens:[]
    });

    await user.save();

    // Xóa mã xác thực sau khi sử dụng
    delete verificationCodes[email_user];
    res.status(200).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("Lỗi khi xử lý đăng ký:", err);
    res.status(500).json({ message: "Lỗi hệ thống khi xử lý đăng ký!", error: err.message });
  }
};

// forgot password
const forgot = async (req, res) =>{
  try{
    const {email_user, newPassword} = req.body;
    if(!email_user || !newPassword){
      return res.status(400).json({ message: "Email và mật khẩu không được để trống!"});
    }

    const user = await User.findOne({email_user});
    if(!user){
      return res.status(404).json({message:"Không tìm thấy tài khoản!!!"});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.pass_user = hashedPassword;
    // user.pass_user = newPassword;

    await user.save();
    res.status(200).json({message:"Cập nhật mật khẩu thành công!!!"});
  } catch (err) {
    console.log("Lỗi khi cập nhật mật khẩu", err);
    res.status(500).json({message: "Lỗi khi api BE khi cập nhật mật khẩu!", error: err.message});
  }
};



const login = async (req, res) => {
  try {
    const { email_user, pass_user} = req.body;

    console.log(email_user, pass_user);

    //validate email_user
    if (!email_user) {
      return res.status(400).json({
        status: 400,
        msg: "email không chính xác!",
      });
    }

    //validate password
    if (!pass_user) {
      return res.status(400).json({
        status: 400,
        msg: "Password không chính xác!",
      });
    }

    const user = await User.findOne({ email_user });
    if (!user) {
      return res.status(400).json({
        status: 400,
        msg: "User không tồn tại.",
      });
    }

    // verify password
    const checkPassword = await bcrypt.compare(pass_user, user.pass_user);
    console.log(user.pass_user);
    if (!checkPassword) {
      return res.status(400).json({
        status: 400,
        msg: "Mật khẩu sai.",
      });
    } else {
      console.log("đúng pass");
    }

    // create token
    const payload = {
      id: user._id,
      name_user: user.name_user,
      role_user: user.role_user,
      status_user: user.status_user,
      email_user: user.email_user,
    };

    const token = genToken(payload);

    // user.tokens.push(token);
    await user.save();

    return res.json({
      status: 200,
      token,
      msg: "đăng nhập thành công",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      msg: "Có lỗi xảy ra vui lòng thử lại!",
    });
  }
};


const genToken = (payload) => {
  payload.exp = Math.floor(Date.now() / 1000) + 60 * 60;
  const token = jwt.sign(payload, "coffee@123");
  return token;
};

module.exports = {
  sendVerificationCode,
  forgot,
  register,
  login
};
