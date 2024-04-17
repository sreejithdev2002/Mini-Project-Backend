const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    isLuxury: {
        type: Boolean,
        required: true
    },
    dateAdded: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

module.exports = new mongoose.model("product", productSchema);