"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const removeFile = async (filename) => {
    try {
        const filePath = path_1.default.join(process.cwd(), "public", "uploads", filename);
        await promises_1.default.unlink(filePath);
    }
    catch (error) {
        console.log(error);
    }
};
exports.removeFile = removeFile;
//# sourceMappingURL=file.js.map