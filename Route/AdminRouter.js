const express = require("express");
const {
  Login,
  AddProducts,
  userList,
  viewProducts,
} = require("../Controller/adminController");
const adminAuth = require("../Middleware/adminAuth");
const router = express.Router();

//POST

router.post("/login", adminAuth, Login);
router.post("/add", adminAuth, AddProducts);

//GET

router.get("/", adminAuth, userList);
router.get("/view", adminAuth, viewProducts);

module.exports = router;
