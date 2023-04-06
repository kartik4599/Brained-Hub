import express from "express";
import userRoutes from "./Routes/userRoutes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoutes from "./Routes/productRoutes";
import connectDB from "./Utils/database";
import cors from "cors";
import cartRoutes from "./Routes/cartRoutes";

dotenv.config();
connectDB(process.env.MONGO_URI || "");

const app = express();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

app.use("/api/user", userRoutes);

app.use("/api/product", productRoutes);

app.use("/api/cart", cartRoutes);

app.listen(process.env.PORT || 6000);
