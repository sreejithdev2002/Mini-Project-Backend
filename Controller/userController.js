const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (userId) => {
  const token = jwt.sign({ userId }, "JWT", { expiresIn: "24h" });
  return token;
};

module.exports.Signup = async (req, res, next) => {
  console.log(req.body, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  const { email, password, name } = req.body;
  try {
    const emailExists = await userModel.findOne({ email: email });
    if (emailExists) {
      return res.json({ message: "Email already exists", status: false });
    }
    const newUser = new userModel({
      username: name,
      email: email,
      password: password,
    });

    const userDetails = await newUser.save();
    const token = createToken(userDetails._id);
    return res.json({
      message: "Account created successfully",
      status: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in sign up",
      status: false,
    });
  }
};

module.exports.Login = async (req, res, next) => {
  console.log(req.body, "@@@@@@@@@@@");
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        return res.json({ message: "User login successful", status: false });
      } else {
        return res.json({ message: "Incorrect password", status: false });
      }
    } else {
      return res.json({ message: "Account not found", status: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in sign up",
      status: false,
    });
  }
};
