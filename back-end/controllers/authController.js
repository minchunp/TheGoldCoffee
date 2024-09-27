const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name_user, email, phoneNumber_user, address_user, password } =
      req.body;

    // validate input
    if (password == "" || password.length < 6 || !password) {
      return res.json({
        status: 400,
        msg: "password không chính xác!",
      });
    }

    // validate email with regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
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

    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      name_user,
      email_user,
      phoneNumber_user: "",
      pass_user: hashPassword,
      address_user: "",
      role_user: "user",
      status_user: 1,
    });

    await user.save();

    return res.json({
      status: 200,
      msg: "Đăng ký thành công!",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      msg: "Có lỗi xảy ra vui lòng thử lại!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate email
    if (!email) {
      return res.status(400).json({
        status: 400,
        msg: "email không chính xác!",
      });
    }

    //validate password
    if (!password) {
      return res.status(400).json({
        status: 400,
        msg: "Password không chính xác!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 400,
        msg: "User không tồn tại.",
      });
    }

    // verify password
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log(user.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: 400,
        msg: "Mật khẩu sai.",
      });
    }

    // create token
    const payload = {
      email,
      role: user.role,
    };

    const token = genToken(payload);

    user.tokens.push(token);
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
