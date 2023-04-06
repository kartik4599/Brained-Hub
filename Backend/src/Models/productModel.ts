import mongoose from "mongoose";

const productModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    images: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productModel);

export default Product;
