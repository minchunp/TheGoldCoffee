const defaultRouter = require("./default");

const productRouter = require("./Rt_product");
const categoryRouter = require("./Rt_category");
const userRouter = require("./Rt_user");
const ratingRouter = require("./Rt_rating");
const cartRouter = require("./Rt_cart");
const toppingRouter = require("./Rt_topping");

//API
const productAPIRouter = require("./productAPI");
const categoryAPIRouter = require("./categoryAPI");
const userAPIRouter = require("./userAPI");
const ratingAPIRouter = require("./ratingAPI");
const cartAPIRouter = require("./cartAPI");
const toppingAPIRouter = require("./toppingAPI");

// Middleware check token - kiểm tra JWT Token từ request

// thư viện jsonwebtoken
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  // Lấy token từ header Authorization của request.
  // `req.headers.authorization` là nơi header `Authorization` được truyền vào (ví dụ: "Bearer <token>")
  // Nếu không có token, gán giá trị mặc định là "" (chuỗi rỗng).
  const tokenBearer = req.headers.authorization ?? "";

  // Nếu không có `Authorization` trong header thì trả về lỗi 401 (Unauthorized).
  if (tokenBearer === "") {
    return res.json({
      status: 401,
      msg: "Unauthorized",
    });
  }

  // Tách token ra khỏi chuỗi `Bearer <token>`.
  // `split(" ")[1]` lấy phần tử thứ 2 trong mảng (phần sau dấu cách).
  const token = tokenBearer.split(" ")[1];

  // Giải mã (decode) JWT token bằng hàm `jwt.verify`.
  // `duy@123` là secret key đã sử dụng khi tạo JWT để xác thực token.
  // Nếu `token` không hợp lệ, hàm `jwt.verify` sẽ ném ra lỗi và kết quả `decode` sẽ là `undefined`.
  const decode = jwt.verify(token, "coffee@123");

  // Nếu token không hợp lệ hoặc không giải mã được, trả về lỗi 401 (Unauthorized).
  if (!decode) {
    return res.json({
      status: 401,
      msg: "Unauthorized",
    });
  }

  // Kiểm tra thời hạn của token: `decode.exp` là thời gian hết hạn của token (dạng Unix timestamp).
  // Nếu thời gian hết hạn (`decode.exp`) nhỏ hơn thời gian hiện tại (`Date.now() / 1000`), token đã hết hạn.
  if (decode.exp < Date.now() / 1000) {
    return res.json({
      status: 401,
      msg: "Unauthorized",
    });
  }

  // Nếu token hợp lệ và còn thời hạn, thêm thông tin user đã giải mã (`decode`) vào request (`req.user`).
  // `req.user` sẽ chứa các thông tin như userId, role, exp,... được lưu trong JWT khi nó được tạo.
  req.user = decode;

  // Gọi `next()` để chuyển tiếp xử lý sang middleware tiếp theo.
  next();
};

// Middleware kiểm tra quyền admin dựa trên `req.user` đã được gán từ middleware `checkToken` ở trên.
const checkIsAdmin = (req, res, next) => {
  // Nếu role của user khác `1` (không phải admin), trả về lỗi 401 (Unauthorized).
  if (req.user.role !== 1) {
    return res.json({
      status: 401,
      msg: "Unauthorized",
    });
  }

  // Nếu user là admin, cho phép tiếp tục sang middleware tiếp theo.
  next();
};

function route(app) {
  app.use("/", defaultRouter);

  app.use("/product", productRouter);
  app.use("/category", categoryRouter);
  app.use("/user", userRouter);
  app.use("/rating", ratingRouter);
  app.use("/cart", cartRouter);
  app.use("/topping", toppingRouter);

  //API
  app.use("/productsAPI", productAPIRouter); // productsAPI/listProduct
  app.use("/categorysAPI", categoryAPIRouter); // categorysAPI/listCategory
  app.use("/usersAPI", userAPIRouter); // usersAPI/listUsers
  app.use("/cartsAPI", cartAPIRouter); // cartsAPI/listCarts
  app.use("/ratingsAPI", ratingAPIRouter); // ratingsAPI/listRatings
  app.use("/toppingsAPI", toppingAPIRouter); // toppingsAPI/listtoppings
}

module.exports = route;
