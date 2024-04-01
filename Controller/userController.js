const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (userId) => {
  const token = jwt.sign({ userId }, "JWT", { expiresIn: maxAge });
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
    const user = await userModel.findOne({ email });

    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        const token = createToken(user._id);
        return res
          .status(200)
          .json({
            user: user,
            message: "User login successful",
            created: true,
            token,
          });
      } else {
        return res.json({ message: "Incorrect password", created: false });
      }
    } else {
      return res.json({ message: "Account not found", created: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in sign up",
      created: false,
    });
  }
};
