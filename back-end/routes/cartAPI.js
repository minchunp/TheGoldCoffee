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

// const ZaloPayConfig = {
//   app_id: "2554",
//   key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
//   key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
//   endpoint: "https://sb-openapi.zalopay.vn/v2/create",
//   queryEndpoint: "https://sb-openapi.zalopay.vn/v2/query",
// };
// router.post("/order", async function (req, res) {
//   try {
//     // Lấy dữ liệu từ request body
//     const {
//       id_user,
//       id_promotion,
//       total_order,
//       name_user,
//       phoneNumber_user,
//       address_user,
//       note_order,
//       date_order,
//       rating_order,
//       products,
//       payment_method, // Thêm phương thức thanh toán
//     } = req.body;

//     if (payment_method === "cash") {
//       // Nếu thanh toán bằng tiền mặt, lưu ngay đơn hàng vào DB
//       const newOrder = new modelOrder({
//         id_user,
//         id_promotion: id_promotion || "none",
//         total_order,
//         name_user,
//         phoneNumber_user,
//         address_user,
//         note_order,
//         date_order,
//         rating_order,
//         feedback_order: "none",
//         isFeedback_order: false,
//         status_order: "chờ xử lý", // Hoặc bất kỳ trạng thái nào bạn muốn
//       });

//       const savedOrder = await newOrder.save();

//       // Lưu chi tiết đơn hàng
//       for (const product of products) {
//         const newDetail = new modelDetailedOrder({
//           id_pro: product.productId,
//           id_order: savedOrder.id,
//           quantity_detailedOrder: product.quantity,
//           size_detailedOrder: product.size,
//           price_detailedOrder: product.price,
//         });
//         await newDetail.save();

//         // Lưu topping nếu có
//         if (product.toppings && product.toppings.length > 0) {
//           for (const toppingName of product.toppings) {
//             const toppingG = await modelTopping.findOne({
//               name_topping: toppingName,
//             });
//             if (toppingG) {
//               const newDetailTopping = new modelDetailedOrder({
//                 id_pro: toppingG.id,
//                 id_order: savedOrder.id,
//                 id_fd: product.productId,
//                 quantity_detailedOrder: 1,
//                 price_detailedOrder: toppingG.price_topping,
//               });
//               await newDetailTopping.save();
//             }
//           }
//         }
//       }

//       // Trả về thông tin đơn hàng
//       return res.status(201).json({
//         message: "Order created successfully (Cash payment)",
//         orderId: savedOrder._id,
//       });
//     }

//     if (payment_method === "zalopay") {
//       // Dữ liệu embed cho ZaloPay
//       const embed_data = { redirecturl: "http://localhost:3000" };
//       const transID = Math.floor(Math.random() * 1000000);
//       const order = {
//         app_id: ZaloPayConfig.app_id,
//         app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
//         app_user: name_user,
//         app_time: Date.now(),
//         amount: total_order,
//         description: `Payment for order`,
//         bank_code: "zalopayapp",
//         item: JSON.stringify(
//           products.map((p) => ({
//             productId: p.productId,
//             quantity: p.quantity,
//             price: p.price,
//           }))
//         ),
//         embed_data: JSON.stringify(embed_data),
//       };

//       // Tạo chữ ký HMAC
//       const data =
//         ZaloPayConfig.app_id +
//         "|" +
//         order.app_trans_id +
//         "|" +
//         order.app_user +
//         "|" +
//         order.amount +
//         "|" +
//         order.app_time +
//         "|" +
//         order.embed_data +
//         "|" +
//         order.item;
//       order.mac = CryptoJS.HmacSHA256(data, ZaloPayConfig.key1).toString();

//       // Gửi yêu cầu đến ZaloPay để lấy link thanh toán
//       const response = await axios.post(ZaloPayConfig.endpoint, null, {
//         params: order,
//       });

//       // Kiểm tra phản hồi từ ZaloPay
//       if (response.data.return_code === 1) {
//         // Thanh toán ZaloPay thành công, lúc này mới lưu vào DB
//         const newOrder = new modelOrder({
//           id_user,
//           id_promotion: id_promotion || "none",
//           total_order,
//           name_user,
//           phoneNumber_user,
//           address_user,
//           note_order,
//           date_order,
//           rating_order,
//           feedback_order: "none",
//           isFeedback_order: false,
//           status_order: "chờ thanh toán",
//         });

//         // Lưu đơn hàng vào DB
//         const savedOrder = await newOrder.save();

//         // Lưu chi tiết từng sản phẩm vào bảng chi tiết đơn hàng
//         for (const product of products) {
//           const newDetail = new modelDetailedOrder({
//             id_pro: product.productId,
//             id_order: savedOrder.id,
//             quantity_detailedOrder: product.quantity,
//             size_detailedOrder: product.size,
//             price_detailedOrder: product.price,
//           });
//           await newDetail.save();

//           // Lưu topping nếu có
//           if (product.toppings && product.toppings.length > 0) {
//             for (const toppingName of product.toppings) {
//               const toppingG = await modelTopping.findOne({
//                 name_topping: toppingName,
//               });
//               if (toppingG) {
//                 const newDetailTopping = new modelDetailedOrder({
//                   id_pro: toppingG.id,
//                   id_order: savedOrder.id,
//                   id_fd: product.productId,
//                   quantity_detailedOrder: 1,
//                   price_detailedOrder: toppingG.price_topping,
//                 });
//                 await newDetailTopping.save();
//               }
//             }
//           }
//         }

//         // Trả về URL thanh toán cho frontend
//         res.status(201).json({
//           message: "Order created successfully after successful payment",
//           orderId: savedOrder._id,
//           paymentUrl: response.data.order_url,
//         });
//       } else {
//         // Thanh toán thất bại, không lưu vào DB
//         res.status(400).json({
//           message: "Failed to create ZaloPay order",
//           error: response.data,
//         });
//       }
//     } else {
//       res.status(400).json({ message: "Invalid payment method" });
//     }
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Error processing payment" });
//   }
// });

// API Thanh toán bằng tiền mặt
// router.post("/order/cash", async function (req, res) {
//   try {
//     const {
//       id_user,
//       id_promotion,
//       total_order,
//       name_user,
//       phoneNumber_user,
//       address_user,
//       note_order,
//       date_order,
//       rating_order,
//       products,
//     } = req.body;
//     const newOrder = new modelOrder({
//       id_user,
//       id_promotion: id_promotion || "none",
//       total_order,
//       name_user,
//       phoneNumber_user,
//       address_user,
//       note_order,
//       date_order,
//       rating_order,
//       feedback_order: "none",
//       isFeedback_order: false,
//       status_order: "chờ xử lý",
//     });
//     const savedOrder = await newOrder.save();
//     for (const product of products) {
//       const newDetail = new modelDetailedOrder({
//         id_pro: product.productId,
//         id_order: savedOrder.id,
//         quantity_detailedOrder: product.quantity,
//         size_detailedOrder: product.size,
//         price_detailedOrder: product.price,
//       });
//       await newDetail.save();
//       if (product.toppings && product.toppings.length > 0) {
//         for (const toppingName of product.toppings) {
//           const toppingG = await modelTopping.findOne({
//             name_topping: toppingName,
//           });
//           if (toppingG) {
//             const newDetailTopping = new modelDetailedOrder({
//               id_pro: toppingG.id,
//               id_order: savedOrder.id,
//               id_fd: product.productId,
//               quantity_detailedOrder: 1,
//               price_detailedOrder: toppingG.price_topping,
//             });
//             await newDetailTopping.save();
//           }
//         }
//       }
//     }
//     return res.status(201).json({
//       message: "Order created successfully (Cash payment)",
//       orderId: savedOrder._id,
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Error processing cash payment" });
//   }
// });
// // API Thanh toán qua ZaloPay
// router.post("/order/zalopay", async function (req, res) {
//   try {
//     const {
//       id_user,
//       id_promotion,
//       total_order,
//       name_user,
//       phoneNumber_user,
//       address_user,
//       note_order,
//       date_order,
//       rating_order,
//       products,
//     } = req.body;
//     const embed_data = { redirecturl: "http://localhost:3000" };
//     const transID = Math.floor(Math.random() * 1000000);
//     const order = {
//       app_id: ZaloPayConfig.app_id,
//       app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
//       app_user: name_user,
//       app_time: Date.now(),
//       amount: total_order,
//       description: `Payment for order`,
//       bank_code: "zalopayapp",
//       item: JSON.stringify(
//         products.map((p) => ({
//           productId: p.productId,
//           quantity: p.quantity,
//           price: p.price,
//         }))
//       ),
//       embed_data: JSON.stringify(embed_data),
//     };
//     const data =
//       ZaloPayConfig.app_id +
//       "|" +
//       order.app_trans_id +
//       "|" +
//       order.app_user +
//       "|" +
//       order.amount +
//       "|" +
//       order.app_time +
//       "|" +
//       order.embed_data +
//       "|" +
//       order.item;
//     order.mac = CryptoJS.HmacSHA256(data, ZaloPayConfig.key1).toString();
//     const response = await axios.post(ZaloPayConfig.endpoint, null, {
//       params: order,
//     });
//     if (response.data.return_code === 1) {
//       // Trả về URL thanh toán cho frontend
//       res.status(201).json({
//         message: "ZaloPay order created successfully",
//         paymentUrl: response.data.order_url,
//         orderData: {
//           id_user,
//           id_promotion,
//           total_order,
//           name_user,
//           phoneNumber_user,
//           address_user,
//           note_order,
//           date_order,
//           rating_order,
//           products,
//         },
//         // Trả về dữ liệu đơn hàng để lưu vào localStorage
//       });
//     } else {
//       res.status(400).json({
//         message: "Failed to create ZaloPay order",
//         error: response.data,
//       });
//     }
//   } catch (error) {
//     console.error("Error creating ZaloPay order:", error);
//     res.status(500).json({ message: "Error processing ZaloPay payment" });
//   }
// });

// router.post("/detailOrder/paymentCallback", async function (req, res) {
//   try {
//     const { data, mac } = req.body;
//     console.log("Received callback from ZaloPay:", req.body);

//     const calculatedMac = CryptoJS.HmacSHA256(
//       data,
//       ZaloPayConfig.key2
//     ).toString();
//     console.log("Calculated MAC:", calculatedMac, "Received MAC:", mac);

//     if (mac !== calculatedMac) {
//       console.log("Invalid MAC: expected", calculatedMac, "received", mac);
//       return res.status(400).json({ message: "Invalid MAC" });
//     }

//     const dataJson = JSON.parse(data);
//     console.log("Parsed data from ZaloPay:", dataJson);

//     if (dataJson.transaction_status === 1) {
//       const {
//         id_user,
//         id_promotion,
//         total_order,
//         name_user,
//         phoneNumber_user,
//         address_user,
//         note_order,
//         date_order,
//         rating_order,
//         products,
//       } = dataJson;

//       const newOrder = new modelOrder({
//         id_user,
//         id_promotion: id_promotion || "none",
//         total_order,
//         name_user,
//         phoneNumber_user,
//         address_user,
//         note_order,
//         date_order,
//         rating_order,
//         feedback_order: "none",
//         isFeedback_order: false,
//         status_order: "đã thanh toán",
//       });

//       const savedOrder = await newOrder.save();
//       console.log("Saved order:", savedOrder);

//       for (const product of products) {
//         const newDetail = new modelDetailedOrder({
//           id_pro: product.productId,
//           id_order: savedOrder.id,
//           quantity_detailedOrder: product.quantity,
//           size_detailedOrder: product.size,
//           price_detailedOrder: product.price,
//         });
//         await newDetail.save();

//         if (product.toppings && product.toppings.length > 0) {
//           for (const toppingName of product.toppings) {
//             const toppingG = await modelTopping.findOne({
//               name_topping: toppingName,
//             });
//             if (toppingG) {
//               const newDetailTopping = new modelDetailedOrder({
//                 id_pro: toppingG.id,
//                 id_order: savedOrder.id,
//                 id_fd: product.productId,
//                 quantity_detailedOrder: 1,
//                 price_detailedOrder: toppingG.price_topping,
//               });
//               await newDetailTopping.save();
//             }
//           }
//         }
//       }

//       console.log("Deleting cart items for user:", id_user);
//       await modelCart.deleteMany({ id_user });

//       res.status(200).json({
//         message: "Payment successful. Order saved and status updated.",
//         order: savedOrder,
//       });
//     } else {
//       console.log(
//         "Payment failed or canceled. Status:",
//         dataJson.transaction_status
//       );
//       res.status(400).json({ message: "Payment failed or canceled" });
//     }
//   } catch (error) {
//     console.error("Error handling payment callback:", error);
//     res.status(500).json({ message: "Error handling payment callback" });
//   }
// });

// router.get(
//   "/detailOrder/queryPaymentStatus/:orderId",
//   async function (req, res) {
//     try {
//       const orderId = req.params.orderId;
//       const order = await modelOrder.findById(orderId);

//       if (!order) {
//         return res.status(404).json({ message: "Order not found" });
//       }

//       const queryData = {
//         app_id: ZaloPayConfig.app_id,
//         app_trans_id: orderId,
//       };

//       const dataString =
//         ZaloPayConfig.app_id +
//         "|" +
//         queryData.app_trans_id +
//         "|" +
//         ZaloPayConfig.key1;
//       queryData.mac = CryptoJS.HmacSHA256(
//         dataString,
//         ZaloPayConfig.key1
//       ).toString();

//       const response = await axios.post(ZaloPayConfig.queryEndpoint, null, {
//         params: queryData,
//       });

//       if (response.data.return_code === 1) {
//         res.status(200).json({
//           message: "Payment status queried successfully",
//           status: response.data.transaction_status,
//           message: response.data.message,
//         });
//       } else {
//         res.status(400).json({
//           message: "Failed to query payment status",
//           error: response.data,
//         });
//       }
//     } catch (error) {
//       console.error("Error querying payment status:", error);
//       res.status(500).json({ message: "Error querying payment status" });
//     }
//   }
// );

// router.post("/order/cash", cartsController.createOrderCash);
// router.post("/order/zalopay", cartsController.createOrderZaloPay);
// router.post("/detailOrder/paymentCallback", cartsController.zaloPayCallback);

// Node v10.15.3

// APP INFO, STK TEST: 4111 1111 1111 1111
const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

/*
 * methed: POST
 * Sandbox	POST	https://sb-openapi.zalopay.vn/v2/create
 * Real	POST	https://openapi.zalopay.vn/v2/create
 * description: tạo đơn hàng, thanh toán
 */
router.post("/payment", async (req, res) => {
  const embed_data = {
    //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
    redirecturl: "https://facebook.com",
  };

  const items = [];
  const transID = Math.floor(Math.random() * 1000000);

  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 50000,
    //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
    //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
    callback_url: " https://822a-171-243-62-192.ngrok-free.app/callback",
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

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
    console.log(error);
  }
});

/**
 * method: POST
 * description: callback để Zalopay Server call đến khi thanh toán thành công.
 * Khi và chỉ khi ZaloPay đã thu tiền khách hàng thành công thì mới gọi API này để thông báo kết quả.
 */
router.post("/callback", (req, res) => {
  let result = {};
  console.log(req.body);
  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng ở đây
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    console.log("lỗi:::" + ex.message);
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

/**
 * method: POST
 * Sandbox	POST	https://sb-openapi.zalopay.vn/v2/query
 * Real	POST	https://openapi.zalopay.vn/v2/query
 * description:
 * Khi user thanh toán thành công,
 * ZaloPay sẽ gọi callback (notify) tới merchant để merchant cập nhật trạng thái
 * đơn hàng Thành Công trên hệ thống. Trong thực tế callback có thể bị miss do lỗi Network timeout,
 * Merchant Service Unavailable/Internal Error...
 * nên Merchant cần hiện thực việc chủ động gọi API truy vấn trạng thái đơn hàng.
 */

router.post("/order-status/:app_trans_id", async (req, res) => {
  const { app_trans_id } = req.params.app_trans_id;

  let postData = {
    app_id: config.app_id,
    app_trans_id:app_trans_id, // Input your app_trans_id
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    console.log(result.data);
    return res.status(200).json(result.data);
    /**
     * kết quả mẫu
      {
        "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
        "return_message": "",
        "sub_return_code": 1,
        "sub_return_message": "",
        "is_processing": false,
        "amount": 50000,
        "zp_trans_id": 240331000000175,
        "server_time": 1711857138483,
        "discount_amount": 0
      }
    */
  } catch (error) {
    console.log("lỗi");
    console.log(error);
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
