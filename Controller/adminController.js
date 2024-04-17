const adminModel = require("../Model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const productModel = require("../Model/productModel");
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
      const passwordMatches = await bcrypt.compare(password, admin.password);

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

module.exports.AddProducts = async (req, res, next) => {
  console.log(req.body, "@@@@@@@@@@@@");
  const { name, brand, description, price, gender, isLuxury, dateAdded, category } = req.body;

  try{
    const productExist = await productModel.findOne({ name: name});
    if (productExist) {
      return res.json({ message: "Product already exist", status: false });
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

    await newProduct.save();
    
    return res.json({
      message: "Product added successfully",
      status: true,
    });
  } catch(error){
    console.log(error);
    return res.json({
      message: "Internal server in sign up",
      status: false,
    });
  }
}