const express = require("express");
const { Signup } = require("../Controller/userController");
const router = express.Router();

router.post("/signup", Signup);

module.exports = router; 