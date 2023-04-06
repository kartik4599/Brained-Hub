import { Router } from "express";
import User from "../Models/userModel";
import bycrypt from "bcryptjs";
import { gentrateToken } from "../Utils/functions";
import Cart from "../Models/cartModel";

const userRoutes = Router();

userRoutes.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name);
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).json({ msg: "Error occured" });
    } else {
      const salt = bycrypt.genSaltSync(10);
      const newPassword = await bycrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: newPassword,
      });

      if (user) {
        res.status(201).json({ msg: "User Created" });
      }

      Cart.create({ user: user.id, cart: [] });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error occured" });
  }
});

userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && bycrypt.compareSync(password, user.password)) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: gentrateToken(user._id),
      });
    } else {
      res.status(400).json({ status: "Enter corrent cridentials" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error occured" });
    console.log(e);
  }
});

export default userRoutes;
