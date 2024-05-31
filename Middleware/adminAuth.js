const jwt = require("jsonwebtoken");
const adminModel = require("../Model/adminModel");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader, "Middleware One");
    const authToken = authHeader && authHeader.split(" ")[1];
    console.log(authToken, "Middleware Two");
    console.log("@@@@@@@@@@@@", authToken, "@@@@@@@@@@@@@@@@");

    if (!authToken) {
      return res.json({
        loginFail: true,
        status: false,
        message: "No auth token",
      });
    }
    const decode = jwt.verify(authToken, "adminJWT");

    const admin = await adminModel.find({ _id: decode.id });

    if (!admin) {
      return res.json({
        message: "Unauthorized access",
        status: false,
        loginFail: true,
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      message: "unauthorized access",
      status: false,
      loginFail: true,
    });
  }
};
