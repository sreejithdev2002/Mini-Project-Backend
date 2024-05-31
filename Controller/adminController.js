const adminModel = require("../Model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const productModel = require("../Model/productModel");
const userModel = require("../Model/userModel");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (adminId) => {
  const token = jwt.sign({ adminId }, "adminJWT", { expiresIn: maxAge });
  return token;
};

module.exports.Login = async (req, res, next) => {
  console.log(req.body, "@@@@@@@@@@@@@@@@@@@@@@@");
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });
    console.log("111111111111111111%%%%%%%%%%%%"+ admin)


    if (admin) {
      console.log("2222222222222222%%%%%%%%%%%%"+ admin)
      const passwordMatches = await bcrypt.compare(password, admin.password);

      if (passwordMatches) {
        console.log("CREATED TOKEN @@@@@@@@!!!!!!!!!")
        const token = createToken(admin._id);
        return res.status(200).json({
          admin: admin,
          message: "Admin login successful",
          created: true,
          token,
        });
      } else {
        return res.status(401).json({
          message: "Incorrect password",
          created: false,
        });
      }
    } else {
      return res.status(404).json({
        message: "Account not found",
        created: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error during login",
      created: false,
    });
  }
};

module.exports.AddProducts = async (req, res, next) => {
  console.log(req.body, "@@@@@@@@@@@@");
  const {
    name,
    brand,
    description,
    price,
    gender,
    isLuxury,
    dateAdded,
    category,
  } = req.body;

  try {
    const productExist = await productModel.findOne({ name: name });
    if (productExist) {
      return res.status(400).json({ message: "Product already exists", status: false });
    }

    const newProduct = new productModel({
      name: name,
      brand: brand,
      description: description,
      price: price,
      gender: gender,
      isLuxury: isLuxury,
      dateAdded: dateAdded,
      category: category,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product added successfully",
      status: true,
      product: savedProduct
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error during product addition",
      status: false,
    });
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

module.exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params._id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update product", error });
  }
};

module.exports.disableProduct = async (req, res) => {
  try{
    const productId = req.params.id;
    const product = await productModel.findById(productId);

    if(!product) {
      return res.status(404).json({ message : "Product not found "});
    }
    product.disableProduct = !product.disableProduct;
    await product.save();
    res.json({ message : "Product disable successfully "});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message : "Server error "});
  }
};