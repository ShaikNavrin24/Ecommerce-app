const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    productImage: { type: [String], required: true },  // Ensure this is an array of strings
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingprice: { type: Number, required: true }
}, {
    timestamps: true
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
