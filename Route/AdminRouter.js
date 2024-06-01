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
const createMulterInstance = require("../Middleware/multer");
const upload = createMulterInstance("products");

//POST

router.post("/login", Login);
router.post("/add", upload.single("image"), AddProducts);

//GET

router.get("/", userList);
router.get("/view", viewProducts);
router.get("/products/:productId", getProductById);

//PUT

router.put("/products/:productId", updateProduct);
router.put("/products/:id/disable", disableProduct);

module.exports = router;
