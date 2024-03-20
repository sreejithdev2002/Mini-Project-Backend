const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
  const token = jwt.sign({ userId }, "JWT", { expiresIn: "24h" });
  return token;
};

module.exports.Signup = async (req, res, next) => {
  console.log(req.body,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  const { email, password, username } = req.body;
  try {
   
    const emailExists = await userModel.findOne({ email: email });
    if (emailExists) {
      return res.json({ message: "Email already exists", status: false });
    }
    const newUser = new userModel({
      username: username,
      email: email,
      password: password,
    });

    const userDetails = await newUser.save();
    const token = createToken(userModel._id);
    return res.json({
      message: "Account created successfully",
      status: false,
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
