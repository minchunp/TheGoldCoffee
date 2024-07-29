var express = require("express");
var router = express.Router();

const toppingController = require("../controllers/toppingsController");

router.get("/listtopping", toppingController.index);

router.post("/add", toppingController.create);
router.get("/add", toppingController.createpage);

router.get("/update_page/:id", toppingController.updatepage);
router.put("/update/:id", toppingController.update);

router.delete("/delete/:id", toppingController.delete);

module.exports = router;
