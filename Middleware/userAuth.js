// const jwt = require("jsonwebtoken");
// const userModel = require("../Model/userModel");

// module.exports = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     console.log(authHeader, "Middleware One");
//     const authToken = authHeader && authHeader.split(" ")[1];
//     console.log(authToken, "Middleware Two");
//     console.log('@@@@@@@@@@@@@',authToken, "@@@@@@@@@@@@@@")
//     if (!authToken) {
//       return res.json({
//         loginfail: true,
//         status: false,
//         message: "No auth token",
//       });
//     }
//     const decode = jwt.verify(authToken, "JWT");
//     console.log(decode + '%%%%%%%%%%%%%%%%');


//     const user = await userModel.find({ _id: decode.id });
//     console.log(user + '*******************');


//     if (!user) {
//       return res.json({
//         message: "Unauthorized access",
//         status: false,
//         loginfail: true,
//       });
//     }

//     if (user.blockStatus) {
//       return res.status(403).json({ message: 'Your account is blocked.' });
//     }

//     req.user = user;
//     console.log(req.user + '!!!!!!!!!!!!!!!!!');
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Token has expired",
//       });
//     }
//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token",
//       });
//     }
//     console.error("Middleware error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel"); // Assuming userModel provides user data access

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader, "Middleware One");

    const authToken = authHeader && authHeader.split(" ")[1];
    console.log(authToken, "Middleware Two");

    if (!authToken) {
      return res.json({
        loginfail: true,
        status: false,
        message: "No auth token",
      });
    }

    // Verify JWT and extract user ID
    let decoded;
    try {
      decoded = jwt.verify(authToken, "JWT");
      console.log(decoded);

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
      console.error("Error verifying token:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    // Asynchronously find the user (ensure your userModel handles _id lookup efficiently)
    const user = await userModel.findById(decoded.userId);
    console.log(user);

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
    console.error("Middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

