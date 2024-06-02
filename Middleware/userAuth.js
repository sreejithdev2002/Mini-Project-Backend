const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader, "Middleware One");
    const authToken = authHeader && authHeader.split(" ")[1];
    console.log(authToken, "Middleware Two");
    console.log('@@@@@@@@@@@@@',authToken, "@@@@@@@@@@@@@@")
    if (!authToken) {
      return res.json({
        loginfail: true,
        status: false,
        message: "No auth token",
      });
    }
    const decode = jwt.verify(authToken, "JWT");

    const user = await userModel.find({ _id: decode.id });

    if (!user) {
      return res.json({
        message: "Unauthorized access",
        status: false,
        loginfail: true,
      });
    }

    if (user.blockStatus) {
      return res.status(403).json({ message: 'Your account is blocked.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    console.error("Middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
