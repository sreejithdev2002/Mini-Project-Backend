const express = require("express");
const {
  Signup,
  Login,
  latestArrivals,
  mens,
  womens,
  casuals,
  formals,
  sandals,
  sneakers,
  luxury,
  featuredProducts,
  productDetails,
  userStatus,
  createOrder,
  getUser,
  getReviews,
  postReviews,
  AddToWishlist,
  checkWislist,
  addToCart,
  getWishlist,
  removeWishlist,
  getCart,
} = require("../Controller/userController");
const router = express.Router();
const userAuth = require("../Middleware/userAuth");

//POST

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/createorder", userAuth, createOrder);
router.post("/reviews/create", userAuth, postReviews);
router.post("/wishlist", userAuth, AddToWishlist);
router.post("/cart/add", userAuth, addToCart);

//GET

router.get("/featured", featuredProducts);
router.get("/latestarrival", latestArrivals);
router.get("/mens", mens);
router.get("/womens", womens);
router.get("/categories/casuals", casuals);
router.get("/categories/formals", formals);
router.get("/categories/sandals", sandals);
router.get("/categories/sneakers", sneakers);
router.get("/luxury", luxury);
router.get("/product/:id", productDetails);
router.get("/auth/status", userAuth, userStatus);
router.get("/user", userAuth, getUser);
router.get("/reviews/:productId", getReviews);
router.get("/wishlist/check/:productId", userAuth, checkWislist);
router.get("/wishlist", userAuth, getWishlist);
router.get("/cart", userAuth, getCart);

//DELETE

router.delete("/wishlist/remove/:productId", userAuth, removeWishlist);

module.exports = router;
