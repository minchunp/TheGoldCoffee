var express = require("express");
var router = express.Router();
const userController = require("../controllers/usersController");

router.get("/listuser", userController.index);
router.post("/add", userController.create);
router.get("/add", userController.createpage);
router.get("/update_page/:id", userController.updatepage);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);

module.exports = router;
