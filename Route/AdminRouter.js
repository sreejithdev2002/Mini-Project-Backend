const express = require("express");
const { Login, AddProducts, userList, viewProducts } = require("../Controller/adminController");
const router = express.Router();

//POST

router.post("/login", Login);
router.post("/add", AddProducts);


//GET

router.get("/", userList);
router.get("/view", viewProducts);
module.exports = router;