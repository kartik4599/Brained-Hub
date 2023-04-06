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
const userModel_1 = __importDefault(require("../Models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const functions_1 = require("../Utils/functions");
const cartModel_1 = __importDefault(require("../Models/cartModel"));
const userRoutes = (0, express_1.Router)();
userRoutes.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        console.log(name);
        const userExist = yield userModel_1.default.findOne({ email });
        if (userExist) {
            res.status(400).json({ msg: "Error occured" });
        }
        else {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const newPassword = yield bcryptjs_1.default.hash(password, salt);
            const user = yield userModel_1.default.create({
                name,
                email,
                password: newPassword,
            });
            if (user) {
                res.status(201).json({ msg: "User Created" });
            }
            cartModel_1.default.create({ user: user.id, cart: [] });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "Error occured" });
    }
}));
userRoutes.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user && bcryptjs_1.default.compareSync(password, user.password)) {
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: (0, functions_1.gentrateToken)(user._id),
            });
        }
        else {
            res.status(400).json({ status: "Enter corrent cridentials" });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "Error occured" });
        console.log(e);
    }
}));
exports.default = userRoutes;
