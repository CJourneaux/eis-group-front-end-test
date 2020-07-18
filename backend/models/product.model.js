const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    colour: { type: String, required: true, trim: true },
    imagePath: { type: String, required: true, trim: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
