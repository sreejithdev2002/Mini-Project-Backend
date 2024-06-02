const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  isLuxury: {
    type: Boolean,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  disableProduct: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("product", productSchema);
