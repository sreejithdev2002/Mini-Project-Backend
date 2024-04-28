const userModel = require("../Model/userModel");
const productModel = require("../Model/productModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const _ = require("lodash")

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
        return res.status(200).json({
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

module.exports.latestArrivals = async (req, res, next) => {
  try {
    const data = await productModel.find({}).sort({ dateAdded: -1 }).limit(10);

    res.json({
      message: "latest arrival fetched",
      status: true,
      LatestArrival: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.mens = async (req, res, next) => {
  try {
    const data = await productModel.find({ gender: "Male" });

    res.json({
      message: "mens collection fetched",
      status: true,
      Mens: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.womens = async (req, res, next) => {
  try {
    const data = await productModel.find({ gender: "Female" });

    res.json({
      message: "womens collection fetched",
      status: true,
      Womens: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.casuals = async (req, res, next) => {
  try {
    const data = await productModel.find({ category: "Casuals" });

    res.json({
      message: "casuals collection fetched",
      status: true,
      Casuals: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.formals = async (req, res, next) => {
  try {
    const data = await productModel.find({ category: "Formals" });

    res.json({
      message: "formals collection fetched",
      status: true,
      Formals: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.sandals = async (req, res, next) => {
  try {
    const data = await productModel.find({ category: "Sandals" });

    res.json({
      message: "sandals collection fetched",
      status: true,
      Sandals: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.sneakers = async (req, res, next) => {
  try {
    const data = await productModel.find({ category: "Sneakers" });

    res.json({
      message: "sneakers collection fetched",
      status: true,
      Sneakers: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.luxury = async (req, res, next) => {
  try {
    const data = await productModel.find({ isLuxury: true });

    res.json({
      message: "luxury collection fetched",
      status: true,
      Luxury: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.featuredProducts = async (req, res, next) => {
  try{
    const products = await productModel.find();
    const shuffledProducts = _.shuffle(products);
    const data = shuffledProducts.slice(0, 4);

    res.json({
      message: "Featured products fetched",
      status: true,
      FeaturedProducts: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in featured products",
      status: false,
    });
  }
};