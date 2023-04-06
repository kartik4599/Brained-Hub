import { Router } from "express";
import { verifyUser } from "../Middleware/verifyUser";
import Cart from "../Models/cartModel";

const cartRoutes = Router();

cartRoutes.put("/", verifyUser, async (req, res) => {
  const { cart, totalAmount } = req.body;

  const filter = { userId: req.user._id };

  const update = { cart, totalAmount };

  const returnCart = await Cart.findOneAndUpdate(filter, update);

  console.log(returnCart);
});

export default cartRoutes;
