"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    richDescription: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    images: [{
            type: String
        }],
    brand: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Category",
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 300
    },
    rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    autoCreate: true
});
const ProductModel = mongoose_1.default.model("Product", productSchema);
exports.default = ProductModel;
//# sourceMappingURL=product.js.map