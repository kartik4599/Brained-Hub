"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUser_1 = require("../Middleware/verifyUser");
const productModel_1 = __importDefault(require("../Models/productModel"));
const productRoutes = (0, express_1.Router)();
productRoutes.post("/", verifyUser_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { title, price, description, quantity, images } = req.body;
        const returnData = yield productModel_1.default.create({
            title,
            price,
            description,
            quantity,
            images,
        });
        if (returnData) {
            res.json(returnData);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "erroe" });
    }
}));
productRoutes.get("/", verifyUser_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { pageno } = req.query;
        const count = yield productModel_1.default.find().count();
        const product = yield productModel_1.default.find()
            .skip(6 * parseInt(pageno))
            .limit(6);
        if (product) {
            res.json({ count, product });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "erroe" });
    }
}));
productRoutes.get("/search", verifyUser_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { pageno, search } = req.query;
        console.log(pageno, search);
        const keyword = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                ],
            }
            : {};
        const count = yield productModel_1.default.find(keyword).count();
        const product = yield productModel_1.default.find(keyword)
            .skip(5 * parseInt(pageno))
            .limit(5);
        if (product) {
            res.json({ count, product });
        }
        else {
            throw Error("no found");
        }
    }
    catch (e) {
        console.log(e);
        res.json({ msg: "erroe " });
    }
}));
exports.default = productRoutes;
