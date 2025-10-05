"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    orderItems: {
        type: [{
                type: mongoose_1.default.Types.ObjectId,
                ref: "OrderItem",
                required: true
            }],
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Rejected"],
        default: "Pending"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true
    },
    shoppingAddress1: {
        type: String,
        required: true
    },
    shoppingAddress2: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    autoCreate: true
});
const OrderModel = mongoose_1.default.model("Order", orderSchema);
exports.default = OrderModel;
//# sourceMappingURL=order.js.map