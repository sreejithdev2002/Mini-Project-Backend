const adminModel = require("../Model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (adminId) => {
  const token = jwt.sign({ adminId }, "JWT", { expiresIn: maxAge });
  return token;
};

module.exports.Login = async (req, res, next) => {
  console.log(req.body, "@@@@@@@@@@@@@@@@@@@@@@@");
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });

    if (admin) {
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        const token = createToken(admin._id);
        return res.status(200).json({
          admin: admin,
          message: "Admin login successful",
          created: true,
          token,
        });
      } else {
        return res.json({
          message: "Incorrect passoword",
          created: false,
        });
      }
    } else {
      return res.json({
        message: "Account not found",
        created: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in sign up",
      created: false,
    });
  }
};
