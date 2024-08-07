var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multer = require("multer");
const upload = multer();
var methodOverride = require("method-override");
var app = express();

// cors [cho phép gọi API từ bên ngoài]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
};

app.use(
  cors({
    origin: "http://localhost:3000", // Điều chỉnh nguồn phù hợp
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// override with POST having ?_method=PUT
app.use(methodOverride("_method"));

//có bao nhiêu file model phải khai báo ở đây
const mongoose = require("mongoose");

//connect database
mongoose
  .connect("mongodb://localhost:27017/the_gold_coffee", {})
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));

//!!!!!!!!!khai báo các router!!!!!!!!!!
//     var indexRouter = require('./routes/index');
//     var usersRouter = require('./routes/users');
//     var usersRouter = require('./routes/products');
//     var productAPIRouter = require('./routes/productAPI');
//     var categoryAPIRouter = require('./routes/categoryAPI');
//     var userAPIRouter = require('./routes/userAPI');
//     var ratingAPIRouter = require('./routes/ratingAPI');
//     var cartAPIRouter = require('./routes/cartAPI');
//     var uploadFile = require('./routes/UploadFile');
//     var emailAPI = require('./routes/EmailAPI');

// cors
app.use(cors(corsOptionsDelegate));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//css
// Phục vụ các tệp tĩnh từ thư mục 'views/assets'
app.use("/product/views/assets", express.static("views/assets/css"));
app.use(
  "/product/update_page/views/assets",
  express.static("views/assets/css")
);
app.use(
  "/category/update_page/views/assets",
  express.static("views/assets/css")
);
app.use("/category/views/assets", express.static("views/assets/css"));
app.use("/user/views/assets", express.static("views/assets/css"));
app.use("/rating/views/assets", express.static("views/assets/css"));
app.use("/cart/views/assets", express.static("views/assets/css"));
app.use("/views/assets", express.static("views/assets/css"));

// !!!!!!!!!url!!!!!!!!!!!
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/products', usersRouter);
// //API
// app.use('/productsAPI', productAPIRouter);
// app.use('/categorysAPI', categoryAPIRouter);
// app.use('/usersAPI', userAPIRouter);
// app.use('/cartsAPI', cartAPIRouter);
// app.use('/ratingsAPI', ratingAPIRouter);
// //upload
// app.use('/UploadFile', uploadFile);
// app.use('/Email', emailAPI);

const route = require("./routes/index"); //không ghi index cũng được, vì mặc định nó chọc vào file index trong thư mục
route(app);

app.use(function (req, res, next) {
  next(createError(404));
});

// catch 404 and forward to error handler
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
