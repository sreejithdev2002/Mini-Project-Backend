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
} = require("../Controller/userController");
const router = express.Router();
const userAuth = require("../Middleware/userAuth");

//POST

router.post("/signup", Signup);
router.post("/login", Login);

//GET

router.get("/", featuredProducts);
router.get("/latestarrival", latestArrivals);
router.get("/mens", mens);
router.get("/womens", womens);
router.get("/categories/casuals", casuals);
router.get("/categories/formals", formals);
router.get("/categories/sandals", sandals);
router.get("/categories/sneakers", sneakers);
router.get("/luxury", luxury);
router.get("/product/:id", userAuth, productDetails);

router.get("/auth/status", (req, res) => {
  const isLoggedIn = req.user ? true : false;

  res.json({ isLoggedIn });
});

module.exports = router;
