var express = require("express");
var router = express.Router();
var modelOrder = require("../models/Cart");
var modelDetailedOrder = require("../models/Detailed_order");
var modelPromotion = require("../models/Promotion");
var modelTopping = require("../models/Topping");

router.get("/detailOrder/:id", async function (req, res) {});

router.get("/detailOrder/:id/:tatus", async function (req, res) {});

//lấy danh sách các đơn hàng {id, name_user, address, total, date, status} "bảng: orders"
router.get("/list_order", async function (req, res) {
  try {
    // Lấy danh sách các đơn hàng với các thuộc tính cần thiết
    const orders = await modelOrder.find(
      {},
      {
        _id: 1,
        name_user: 1,
        address_user: 1,
        total_order: 1,
        date_order: 1,
        status_order: 1,
      }
    );

    // Chuyển đổi dữ liệu và định dạng lại ngày tháng
    const formattedOrders = orders.map((order) => {
      // Lấy ngày và giờ từ date_order
      const date = new Date(order.date_order);
      const formattedDate = `${date.getHours()}:${String(
        date.getMinutes()
      ).padStart(2, "0")} ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      return {
        id: order._id,
        name_user: order.name_user,
        address: order.address_user,
        total: order.total_order,
        date: formattedDate,
        status: order.status_order,
        originalDate: date, // Lưu giữ date gốc để sắp xếp
      };
    });

    // Sắp xếp mảng theo thứ tự từ mới nhất đến cũ nhất
    formattedOrders.sort((a, b) => b.originalDate - a.originalDate);

    // Xóa thuộc tính originalDate trước khi trả về
    const result = formattedOrders.map(({ originalDate, ...rest }) => rest);

    res.json(result);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// API tạo đơn hàng và thêm chi tiết sản phẩm
// POST http://localhost:3001/cartsAPI/order
router.post("/order", async function (req, res) {
  try {
    // Lấy dữ liệu từ request body
    const {
      id_user,
      id_promotion,
      total_order,
      name_user,
      phoneNumber_user,
      address_user,
      note_order,
      date_order,
      rating_order,
      feedback_order,
      isFeedback_order,
      status_order,
      products, // Danh sách sản phẩm từ cart
    } = req.body;

    // Tạo một đơn hàng mới trong bảng Order
    const newOrder = new modelOrder({
      id_user,
      id_promotion: "none",
      total_order,
      name_user,
      phoneNumber_user,
      address_user,
      note_order,
      date_order,
      rating_order,
      feedback_order: "none",
      isFeedback_order,
      status_order,
    });

    // Lưu đơn hàng vào cơ sở dữ liệu
    const savedOrder = await newOrder.save();

    // Lưu chi tiết từng sản phẩm trong đơn
    for (let index = 0; index < products.length; index++) {
      const newDetail = new modelDetailedOrder({
        id_pro: products[index].productId,
        id_order: savedOrder.id,
        quantity_detailedOrder: products[index].quantity,
        size_detailedOrder: products[index].size,
        price_detailedOrder: products[index].price,
      });

      // Lưu topping nếu có
      if (products[index].toppings && products[index].toppings.length > 0) {
        const mangtopping = products[index].toppings;

        for (let z = 0; z < mangtopping.length; z++) {
          const toppingName = mangtopping[z]; // tên của topping

          // Lấy thông tin topping từ tên topping trong cơ sở dữ liệu
          const toppingG = await modelTopping.findOne({
            name_topping: toppingName,
          });

          // Kiểm tra nếu topping được tìm thấy
          if (toppingG) {
            // Lưu topping vào chi tiết đơn hàng
            const newDetailTopping = new modelDetailedOrder({
              id_pro: toppingG.id,
              id_order: savedOrder.id,
              quantity_detailedOrder: 1,
              price_detailedOrder: toppingG.price_topping,
            });

            console.log(newDetailTopping);

            await newDetailTopping.save();
          } else {
            console.log(`Topping '${toppingName}' không tìm thấy.`);
          }
        }
      }

      await newDetail.save();
    }

    // Phản hồi thành công
    res.status(201).json({
      message: "Order and detailed orders created successfully",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

module.exports = router;
