"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = async () => {
    try {
        if (!mongoose_1.default.connection.readyState) {
            await mongoose_1.default.connect(process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/e-commerce");
        }
        console.log("\n\n----------------------");
        console.log("MongoDB connected successfully!");
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = connectToDB;
//# sourceMappingURL=connection.js.map