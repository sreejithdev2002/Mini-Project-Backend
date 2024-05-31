const express = require("express");
const {
  Login,
  AddProducts,
  userList,
  viewProducts,
  getProductById,
  updateProduct,
  disableProduct,
} = require("../Controller/adminController");
// const adminAuth = require("../Middleware/adminAuth");
const router = express.Router();

//POST

router.post("/login", Login);
router.post("/add", AddProducts);

//GET

router.get("/", userList);
router.get("/view", viewProducts);
router.get("/products/:productId", getProductById);

//PUT

router.put("/products/:productId", updateProduct);
router.put("/products/:id/disable", disableProduct);

module.exports = router;
