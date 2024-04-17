const express = require("express");
const { Login, AddProducts } = require("../Controller/adminController");
const router = express.Router();

//POST

router.post("/login", Login);
router.post("/add", AddProducts);

module.exports = router;
