import mongoose from "mongoose";

const cartModel = new mongoose.Schema(
  {
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartModel);

export default Cart;
