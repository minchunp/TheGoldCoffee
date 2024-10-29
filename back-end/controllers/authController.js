const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name_user, email_user, pass_user } = req.body;

    console.log(name_user, email_user, pass_user);

    // validate pass_user
    if (pass_user == "" || pass_user.length < 6 || !pass_user) {
      return res.json({
        status: 400,
        msg: "Password không chính xác!",
      });
    }

    // validate email with regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email_user)) {
      return res.json({
        status: 400,
        msg: "Email không chính xác!",
      });
    }

    // check email in database
    const checkEmail = await User.findOne({ email_user });
    if (checkEmail) {
      return res.json({
        status: 400,
        msg: "Email đã tồn tại!",
      });
    }

    const hashPassword = await bcrypt.hash(pass_user, 10);

    // create user
    const user = new User({
      name_user,
      email_user,
      phoneNumber_user: "",
      pass_user: hashPassword,
      address_user: "",
      role_user: "user",
      status_user: 1,
      tokens: [],
    });

    await user.save();

    return res.json({
      status: 200,
      msg: "Đăng ký thành công.!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      msg: "Có lỗi xảy ra khi xử lí đăng kí vui lòng thử lại!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email_user, pass_user } = req.body;

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
  register,
  login,
};
