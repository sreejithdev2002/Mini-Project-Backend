const userModel = require("../Model/userModel");
const productModel = require("../Model/productModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const _ = require("lodash");
const orderModel = require("../Model/orderModel");

const createToken = (userId) => {
  const token = jwt.sign({ userId }, "JWT", { expiresIn: maxAge });
  return token;
};

module.exports.Signup = async (req, res, next) => {
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
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.json({
        created: false,
        message: "User does not exist",
      });
    }

    if (existingUser.blockStatus) {
      return res.json({
        created: false,
        message: "User is blocked",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.json({
        created: false,
        message: "Wrong password",
      });
    }

    const token = createToken(existingUser._id);
    res.json({
      user: existingUser,
      created: true,
      message: "Login success",
      token,
    });
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
    const data = await productModel
      .find({ disableProduct: { $ne: true } })
      .sort({ dateAdded: -1 })
      .limit(10);
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
    const data = await productModel.find({
      gender: "Male",
      disableProduct: false,
    });
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
    const data = await productModel.find({
      gender: "Female",
      disableProduct: false,
    });

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
    const data = await productModel.find({
      category: "Casuals",
      disableProduct: false,
    });

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
    const data = await productModel.find({
      category: "Formals",
      disableProduct: false,
    });

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
    const data = await productModel.find({
      category: "Sandals",
      disableProduct: false,
    });

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
    const data = await productModel.find({
      category: "Sneakers",
      disableProduct: false,
    });

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
    const data = await productModel.find({
      isLuxury: true,
      disableProduct: false,
    });

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
  try {
    const products = await productModel.find({ disableProduct: false });
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

module.exports.productDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const singleProduct = await productModel.findById(productId);
    if (singleProduct) {
      return res.status(200).json({
        message: "success",
        status: true,
        product: singleProduct,
      });
    }
    res.status(404).json({
      message: "Product not found",
      status: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};

module.exports.userStatus = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.json({ message: "User fetched", user });
    } else {
      res.json({ message: "No user logged in", user: null });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newOrder = new orderModel({
      product: productId,
      user: userId,
      quantity: quantity,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      status: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error in creating order",
      error: error.message,
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (userId) {
      res.status(200).json({ message: "User id fetched", userId: userId });
    } else {
      res.status(404).json({ message: "User id not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
