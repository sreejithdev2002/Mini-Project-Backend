const express = require("express");
const { Login } = require("../Controller/adminController");
const router = express.Router();

//POST

router.post("/login", Login);

module.exports = router;
