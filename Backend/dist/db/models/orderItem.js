"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    autoCreate: true
});
const OrderItemModel = mongoose_1.default.model("OrderItem", orderItemSchema);
exports.default = OrderItemModel;
//# sourceMappingURL=orderItem.js.map