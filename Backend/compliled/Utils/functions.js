"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = exports.gentrateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const gentrateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
    });
};
exports.gentrateToken = gentrateToken;
const authToken = (token) => {
    let senduser;
    jsonwebtoken_1.default.verify(token, process.env.JWTToken, (err, user) => {
        if (err) {
            console.log(err);
        }
        senduser = user;
    });
    return senduser;
};
exports.authToken = authToken;
