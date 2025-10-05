"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(process.cwd(), "public", "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueFileName = crypto_1.default.randomUUID() + "-" + Date.now();
        cb(null, uniqueFileName + path_1.default.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/"))
        cb(null, true);
    else
        cb(new Error("Only image files are allowed!"), false);
};
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.default = upload;
//# sourceMappingURL=multer.js.map