const express = require("express");
const {
  Login,
  AddProducts,
  userList,
  viewProducts,
  getProductById,
  updateProduct,
  disableProduct,
  blockUser,
  getAllOrders,
} = require("../Controller/adminController");
const adminAuth = require("../Middleware/adminAuth");
const router = express.Router();
const createMulterInstance = require("../Middleware/multer");
const upload = createMulterInstance("products");

//POST

router.post("/login", Login);
router.post("/add", upload.single("image"), adminAuth, AddProducts);

//GET

router.get("/", adminAuth, userList);
router.get("/view", adminAuth, viewProducts);
router.get("/products/:productId", adminAuth, getProductById);
router.get("/orders", getAllOrders);

//PUT

router.put("/products/:productId", adminAuth, updateProduct);
router.put("/products/:id/disable", adminAuth, disableProduct);
router.put("/users/:id/block", blockUser);

module.exports = router;
