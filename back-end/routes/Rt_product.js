var express = require("express");
var router = express.Router();

const productController = require("../controllers/productsController");

//product/delete/:id

router.get("/listproduct", productController.index);

router.post("/add", productController.create);
router.get("/add", productController.createpage);

router.get("/update_page/:id", productController.updatepage);
router.put("/update/:id", productController.update);

router.delete("/delete/:id", productController.delete);

router.get("/search", productController.findByName);

module.exports = router;
