const express = require("express");
const { Signup, Login } = require("../Controller/userController");
const router = express.Router();

//POST

router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router; 