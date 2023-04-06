import { Router } from "express";
import { verifyUser } from "../Middleware/verifyUser";
import Product from "../Models/productModel";

const productRoutes = Router();

interface page {
  pageno: string;
}

interface search {
  pageno: string;
  search: string;
}

productRoutes.post("/", verifyUser, async (req, res) => {
  try {
    let { title, price, description, quantity, images } = req.body;

    const returnData = await Product.create({
      title,
      price,
      description,
      quantity,
      images,
    });

    if (returnData) {
      res.json(returnData);
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: "erroe" });
  }
});

productRoutes.get("/", verifyUser, async (req, res) => {
  try {
    let { pageno } = req.query as unknown as page;

    const count = await Product.find().count();

    const product = await Product.find()
      .skip(6 * parseInt(pageno))
      .limit(6);

    if (product) {
      res.json({ count, product });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: "erroe" });
  }
});

productRoutes.get("/search", verifyUser, async (req, res) => {
  try {
    let { pageno, search } = req.query as unknown as search;

    console.log(pageno, search);

    const keyword = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const count = await Product.find(keyword).count();

    const product = await Product.find(keyword)
      .skip(5 * parseInt(pageno))
      .limit(5);

    if (product) {
      res.json({ count, product });
    } else {
      throw Error("no found");
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: "erroe " });
  }
});

export default productRoutes;
