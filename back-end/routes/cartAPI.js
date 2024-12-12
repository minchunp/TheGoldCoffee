var express = require("express");
var router = express.Router();
var modelOrder = require("../models/Cart");
var modelDetailedOrder = require("../models/Detailed_order");
var modelPromotion = require("../models/Promotion");
var modelTopping = require("../models/Topping");
var modelProduct = require("../models/Product");

// API thay đổi trạng thái đơn hàng
// POST http://localhost:3001/cartsAPI/detailOrder/setSTT
router.post("/detailOrder/setSTT", async function (req, res) {
  try {
    const { id, status_order } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!id || !status_order) {
      return res
        .status(400)
        .json({ message: "Thiếu id hoặc trạng thái đơn hàng" });
    }

    // Cập nhật trạng thái của đơn hàng
    const updatedOrder = await modelOrder.findByIdAndUpdate(
      id,
      { status_order: status_order },
      { new: true } // Trả về tài liệu đã cập nhật
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    res.status(200).json({
      message: "Cập nhật trạng thái đơn hàng thành công",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái đơn hàng" });
  }
});

// API lấy đơn hàng theo ID
// GET http://localhost:3001/cartsAPI/detailOrder/:id
router.get("/detailOrder/:id", async function (req, res) {
  try {
    const orderId = req.params.id;

    // Lấy thông tin đơn hàng
    const order = await modelOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Lấy chi tiết đơn hàng
    const detailedOrders = await modelDetailedOrder.find({ id_order: orderId });

    // Tách chi tiết đơn hàng thành hai mảng: products và toppings
    const products = [];
    const toppings = [];

    detailedOrders.forEach((detail) => {
      if (!detail.id_fd) {
        // Không có id_fd thì đây là sản phẩm
        products.push({
          productId: detail.id_pro,
          quantity: detail.quantity_detailedOrder,
          price: detail.price_detailedOrder,
          size: detail.size_detailedOrder || null,
          toppings: [],
        });
      } else {
        // Có id_fd thì đây là topping
        toppings.push(detail);
      }
    });

    // Duyệt qua các topping và thêm vào mảng `toppings` của sản phẩm tương ứng
    toppings.forEach((topping) => {
      // Tìm sản phẩm cha có id_pro bằng với id_fd của topping
      const parentProduct = products.find(
        (product) => product.productId === topping.id_fd
      );
      if (parentProduct) {
        parentProduct.toppings.push(topping.id_pro); // Chỉ thêm id của topping vào
      }
    });

    // Lấy tên topping từ modelTopping
    const toppingIds = toppings.map((topping) => topping.id_pro);
    const toppingNames = await modelTopping
      .find({ _id: { $in: toppingIds } })
      .lean();

    // Chuyển đổi id topping thành tên
    products.forEach((product) => {
      product.toppings = product.toppings.map((toppingId) => {
        const topping = toppingNames.find(
          (t) => t._id.toString() === toppingId
        );
        return topping ? topping.name_topping : toppingId; // Nếu không tìm thấy, giữ nguyên id
      });
    });

    // Định dạng dữ liệu đơn hàng phản hồi
    const response = {
      id_user: order.id_user,
      id_promotion: order.id_promotion !== "none" ? order.id_promotion : null,
      total_order: order.total_order,
      name_user: order.name_user,
      phoneNumber_user: order.phoneNumber_user,
      address_user: order.address_user,
      note_order: order.note_order,
      date_order: order.date_order.toISOString(),
      rating_order: order.rating_order,
      feedback_order: order.feedback_order,
      isFeedback_order: order.isFeedback_order,
      status_order: order.status_order,
      method_pay_type: order.method_pay_type,
      method_pay_status: order.method_pay_status,
      app_trans_id: order.app_trans_id || null,
      products: products,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Error fetching order details" });
  }
});

//lấy danh sách các đơn hàng {id, id_user, name_user, address, total, date, status} "bảng: orders"
router.get("/list_order", async function (req, res) {
  try {
    // Lấy danh sách các đơn hàng với các thuộc tính cần thiết
    const orders = await modelOrder.find(
      {},
      {
        _id: 1,
        id_user: 1,
        name_user: 1,
        address_user: 1,
        total_order: 1,
        date_order: 1,
        status_order: 1,
        method_pay_status: 1,
        method_pay_type: 1,
        app_trans_id: 1,
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
        id_user: order.id_user,
        name_user: order.name_user,
        address: order.address_user,
        total: order.total_order,
        date: formattedDate,
        status: order.status_order,
        method_pay_type: order.method_pay_type,
        method_pay_status: order.method_pay_status,
        app_trans_id: order.app_trans_id,
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
      discount,
      name_user,
      phoneNumber_user,
      address_user,
      note_order,
      date_order,
      rating_order,
      feedback_order,
      isFeedback_order,
      status_order,
      method_pay_type,
      method_pay_status,
      products, // Danh sách sản phẩm từ cart
    } = req.body;

    // Tạo một đơn hàng mới trong bảng Order
    const newOrder = new modelOrder({
      id_user,
      id_promotion,
      total_order,
      discount,
      name_user,
      phoneNumber_user,
      address_user,
      note_order,
      date_order,
      rating_order,
      feedback_order: "none",
      isFeedback_order,
      method_pay_type,
      method_pay_status,
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
              id_fd: products[index].productId,
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
router.post("/orderzalopay", async function (req, res) {
  try {
    // Lấy dữ liệu từ request body
    const {
      id_user,
      id_promotion,
      total_order,
      discount,
      name_user,
      phoneNumber_user,
      address_user,
      note_order,
      date_order,
      rating_order,
      feedback_order,
      isFeedback_order,
      status_order,
      method_pay_type,
      method_pay_status,
      app_trans_id, // app_trans_id sẽ được gửi từ frontend hoặc ZaloPay
      products, // Danh sách sản phẩm từ cart
    } = req.body;

    console.log("orderzalopay: " + app_trans_id);

    // Tạo một đơn hàng mới trong bảng Order với app_trans_id
    const newOrder = new modelOrder({
      id_user,
      id_promotion,
      total_order,
      discount,
      name_user,
      phoneNumber_user,
      address_user,
      note_order,
      date_order,
      rating_order,
      feedback_order: "none",
      isFeedback_order,
      method_pay_type,
      method_pay_status,
      app_trans_id, // Lưu app_trans_id vào cơ sở dữ liệu
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
              id_fd: products[index].productId,
              quantity_detailedOrder: 1,
              price_detailedOrder: toppingG.price_topping,
            });

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
