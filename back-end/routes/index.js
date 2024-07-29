
const defaultRouter = require('./default');

const productRouter = require('./Rt_product');
const categoryRouter = require('./Rt_category');
const userRouter = require('./Rt_user');
const ratingRouter = require('./Rt_rating');
const cartRouter = require('./Rt_cart');
const toppingRouter = require('./Rt_topping');


//API
const productAPIRouter = require('./productAPI');
const categoryAPIRouter = require('./categoryAPI');
const userAPIRouter = require('./userAPI');
const ratingAPIRouter = require('./ratingAPI');
const cartAPIRouter = require('./cartAPI');
const toppingAPIRouter = require('./toppingAPI');


function route(app) { 
  app.use('/', defaultRouter);

  app.use('/product', productRouter);
  app.use('/category', categoryRouter);
  app.use('/user', userRouter);
  app.use('/rating', ratingRouter);
  app.use('/cart', cartRouter);
  app.use('/topping', toppingRouter);

  //API
  app.use('/productsAPI', productAPIRouter); // productsAPI/listProduct
  app.use('/categorysAPI', categoryAPIRouter); // categorysAPI/listCategory
  app.use('/usersAPI', userAPIRouter); // usersAPI/listUsers
  app.use('/cartsAPI', cartAPIRouter); // cartsAPI/listCarts
  app.use('/ratingsAPI', ratingAPIRouter); // ratingsAPI/listRatings
  app.use('/toppingsAPI', toppingAPIRouter); // toppingsAPI/listtoppings

} 

module.exports = route;
