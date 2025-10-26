"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    color: {
        type: String,
        require: true
    },
    icon: {
        type: String,
        required: false
    },
    image: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
    autoCreate: true
});
const CategoryModel = mongoose_1.default.model("Category", categorySchema);
exports.default = CategoryModel;
//# sourceMappingURL=category.js.map