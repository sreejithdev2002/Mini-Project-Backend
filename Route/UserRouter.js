const express = require("express");
const { Signup, Login, latestArrivals } = require("../Controller/userController");
const router = express.Router();
// const userAuth = require("../Middleware/userAuth");

//POST

router.post("/signup", Signup);
router.post("/login", Login);



//GET

router.get("/latestarrival", latestArrivals);

module.exports = router; 