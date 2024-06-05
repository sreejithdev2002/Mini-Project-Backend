// const jwt = require("jsonwebtoken");
// const adminModel = require("../Model/adminModel");

// module.exports = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const authtoken = authHeader.replace(/^Bearer\s+/i, "");
//     if (!authtoken)
//       return res.json({
//         loginfail: true,
//         status: false,
//         message: "NO auth token",
//       });

//     const decoded = jwt.verify(authtoken, "adminjwt");
//     const admin = await adminModel.findOne({ _id: decoded.id });
//     if (!admin)
//       return res.json({
//         loginfail: true,
//         status: false,
//         message: "Unauthorized token",
//       });
//     req.admin = admin;
//     console.log(admin)

//     next();
//   } catch (error) {
//     return res.json({
//       message: "Unauthorized access",
//       status: false,
//       loginFail: true,
//     });
//   }
// };

const jwt = require("jsonwebtoken");
const adminModel = require("../Model/adminModel");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        loginFail: true,
        status: false,
        message: "No auth token provided",
      });
    }

    const authtoken = authHeader.replace(/^Bearer\s+/i, "");
    if (!authtoken) {
      return res.status(401).json({
        loginFail: true,
        status: false,
        message: "No auth token provided",
      });
    }

    const decoded = jwt.verify(authtoken, "adminjwt");
    const admin = await adminModel.findOne({ _id: decoded.adminId }); // Ensure this matches the token payload structure

    if (!admin) {
      return res.status(401).json({
        loginFail: true,
        status: false,
        message: "Unauthorized token",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log("Authorization error:", error);
    return res.status(401).json({
      message: "Unauthorized access",
      status: false,
      loginFail: true,
    });
  }
};

