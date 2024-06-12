const express = require("express");
const {
  Login,
  AddProducts,
  userList,
  viewProducts,
  getProductById,
  disableProduct,
  blockUser,
  getAllOrders,
  deleteProduct,
  deleteOrder,
  updateProduct,
  getProductGenderDistribution,
  getProductLuxuryDistribution,
  getProductBlockStatusDistribution,
  getProductCategoryDistribution,
  getAllReviews,
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
router.get("/products/:id", adminAuth, getProductById);
router.get("/orders", adminAuth, getAllOrders);
router.get("/reviews/all", getAllReviews);

//PUT

router.put("/products/:id/disable", adminAuth, disableProduct);
router.put("/users/:id/block", adminAuth, blockUser);
router.put("/products/:productId", adminAuth, updateProduct);

//DELETE
router.delete("/products/:id/delete", adminAuth, deleteProduct);
router.delete("/orders/:orderId/delete", adminAuth, deleteOrder);



//CHARTS

router.get('/product-gender-distribution', getProductGenderDistribution);
router.get('/product-luxury-distribution', getProductLuxuryDistribution);
router.get('/product-blockstatus-distribution', getProductBlockStatusDistribution);
router.get('/product-category-distribution', getProductCategoryDistribution);









module.exports = router;
