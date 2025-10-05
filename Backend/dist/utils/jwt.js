"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../db/models/user"));
const generateToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.generateToken = generateToken;
const authorizeUser = async (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        return user_1.default.findById(payload.userId);
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.authorizeUser = authorizeUser;
//# sourceMappingURL=jwt.js.map