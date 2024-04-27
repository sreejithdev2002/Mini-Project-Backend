const express = require("express");
const { Login, AddProducts, userList } = require("../Controller/adminController");
const router = express.Router();

//POST

router.post("/login", Login);
router.post("/add", AddProducts);


//GET

router.get("/", userList);
module.exports = router;