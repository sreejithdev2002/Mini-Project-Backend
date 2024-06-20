const userModel = require("../Model/userModel");
const productModel = require("../Model/productModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const _ = require("lodash");
const orderModel = require("../Model/orderModel");
const reviewModel = require("../Model/reviewModel");

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

module.exports.getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ productId: req.params.productId })
      .populate("userId", "username");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.postReviews = async (req, res) => {
  const review = new reviewModel({
    productId: req.body.productId,
    userId: req.user.id,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports.AddToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.wishlist.includes(productId)) {
      // Remove product from wishlist
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      await user.save();
      return res.status(201).json({
        message: "Product removed from wishlist",
      });
    } else {
      // Add product to wishlist
      user.wishlist.push(productId);
      await user.save();
      return res.status(200).json({
        message: "Product added to wishlist",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports.checkWislist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isInWishlist = user.wishlist.includes(productId);
    res.status(200).json({
      inWishlist: isInWishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports.getWishlist = async (req, res) => {
  try {
    const data = await userModel.findById(req.user._id).populate("wishlist");

    res.status(200).json(data.wishlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.removeWishlist = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== productId
    );
    await user.save();

    res.status(200).json({
      message: "product removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity: quantity });
    }

    await user.save();

    res.status(200).json({
      message: "Product added to cart",
      cart: user.cart,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
      status: false,
    });
  }
};

module.exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).populate("cart.product");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
