const adminModel = require("../Model/adminModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const productModel = require("../Model/productModel");
const userModel = require("../Model/userModel");
const upload = require("../Middleware/multer");
const { validationResult } = require("express-validator");
const orderModel = require("../Model/orderModel");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const reviewModel = require("../Model/reviewModel");

const maxAge = 30 * 24 * 60 * 60;

const createToken = (adminId) => {
  const token = jwt.sign({ adminId }, "adminjwt", { expiresIn: maxAge });
  console.log(token);
  return token;
};

module.exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await adminModel.findOne({ email });
    if (!existingAdmin) {
      return res.json({
        status: false,
        message: "Admin does not exist",
      });
    }
    const passwordMatch = await bcryptjs.compare(
      password,
      existingAdmin.password
    );
    if (!passwordMatch) {
      return res.json({
        status: false,
        message: "Wrong password",
      });
    }
    const token = createToken(existingAdmin._id);
    res.json({
      admin: existingAdmin,
      status: true,
      message: "Login success",
      token,
    });
  } catch (err) {
    console.log("admin login error", err);
    res.json({
      message: "Login failed",
      status: false,
    });
  }
};

module.exports.AddProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create new Product instance
    const {
      name,
      brand,
      description,
      price,
      gender,
      isLuxury,
      // dateAdded,
      category,
    } = req.body;
    const image = req.file ? req.file.filename : null;

    // Create a new product instance using the Product model
    const product = new productModel({
      name,
      brand,
      description,
      price,
      gender,
      isLuxury,
      // dateAdded: new Date(dateAdded),
      category,
      image,
    });

    // Save the product to the database
    await product.save();

    res.status(201).json(product); // Return the created product
  } catch (error) {
    console.error(` Error Here : ${error}`);
    res.status(500).send("Server Error");
  }
};

module.exports.userList = async (req, res, next) => {
  try {
    const data = await userModel.find();

    res.status(200).json({
      message: "User list fetched",
      status: true,
      UserList: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error during user list fetching",
      status: false,
    });
  }
};

module.exports.viewProducts = async (req, res, next) => {
  try {
    const data = await productModel.find();

    res.status(200).json({
      message: "Products fetched",
      status: true,
      ViewProducts: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error during product fetching",
      status: false,
    });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};



module.exports.disableProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found " });
    }
    product.disableProduct = !product.disableProduct;
    await product.save();
    res.json({ message: "Product disable successfully " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error " });
  }
};

module.exports.blockUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.blockStatus = !user.blockStatus;
    await user.save();
    res.json({ status: true, blockStatus: user.blockStatus });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("product")
      .populate("user")
      .exec();

    res.status(200).json({ status: true, orders });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imagePath = path.join(
      __dirname,
      "../public/images/products/",
      product.image
    );
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file : ", err);
      } else {
        console.log("Image file deleted successfully");
      }
    });

    await productModel.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

  module.exports.deleteOrder = async(req, res) => {
    const {orderId} = req.params;

    try{
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ message: "Order deleted successfully" });
    } catch(error){
      res.status(500).json({ error: "failed to delete order"})
    }
  };


module.exports.updateProduct = async (req, res) => {
  try{
    const product = await productModel.findById(req.params.productId);
    if(!product){
      return res.status(404).json({ message: "Product not found "});
    }

    Object.assign(product, req.body);

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch(error) {
    res.status(400).json({ message: error.message});
  }
};

module.exports.getAllReviews = async(req, res) => {
  try{
    const data = await reviewModel.find().populate('userId', 'username').populate('productId', 'name image');
    res.json({
      reviews: data,
      status: true,
      message: "Fetched all reviews"
    });
  } catch(error){
    res.status(500).json({
      message: error.message,
      status: false,
      message: "Failed to fetch reviews"

    });
  }
};




//CHARTS

module.exports.getProductGenderDistribution = async (req, res) => {
  try {
    const distribution = await productModel.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);
    res.status(200).json(distribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getProductLuxuryDistribution = async (req, res) => {
  try {
    const distribution = await productModel.aggregate([
      { $group: { _id: '$isLuxury', count: { $sum: 1 } } }
    ]);
    res.status(200).json(distribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getProductBlockStatusDistribution = async (req, res) => {
  try {
    const distribution = await productModel.aggregate([
      { $group: { _id: '$disableProduct', count: { $sum: 1 } } }
    ]);
    res.status(200).json(distribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getProductCategoryDistribution = async (req, res) => {
  try {
    const distribution = await productModel.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.status(200).json(distribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};