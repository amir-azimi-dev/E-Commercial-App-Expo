"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOrder = exports.updateOrderStatus = exports.placeOrder = void 0;
const graphql_1 = require("graphql");
const order_1 = __importDefault(require("../../db/models/order"));
const product_1 = __importDefault(require("../../db/models/product"));
const orderItem_1 = __importDefault(require("../../db/models/orderItem"));
const mongoose_1 = __importDefault(require("mongoose"));
const placeOrder = async (_, { orderItems, shippingAddress1, shippingAddress2, phone, city, zip, country }, context) => {
    try {
        const hasInvalidOrderItemProductId = orderItems.some(item => (!mongoose_1.default.isValidObjectId(item.product) || item.quantity <= 0));
        if (hasInvalidOrderItemProductId)
            throw new graphql_1.GraphQLError("Invalid entry!");
        const manipulatedOrderItemsIds = [];
        let totalPrice = 0;
        for (const item of orderItems) {
            const targetProduct = await product_1.default.findById(item.product);
            if (!targetProduct) {
                throw new graphql_1.GraphQLError("Product not found!", {
                    extensions: { code: "PRODUCT_NOT_FOUND", status: 404 },
                });
            }
            const newOrderItem = await orderItem_1.default.create(item);
            manipulatedOrderItemsIds.push(newOrderItem._id.toString());
            totalPrice += targetProduct.price * item.quantity;
        }
        const data = { orderItems: manipulatedOrderItemsIds, totalPrice, customer: context.user._id, shippingAddress1, shippingAddress2, phone, city, zip, country };
        const newOrderData = (await order_1.default.create(data));
        await newOrderData.populate({ path: "orderItems", populate: { path: "product", populate: "category" } });
        await newOrderData.populate("customer");
        return newOrderData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.placeOrder = placeOrder;
const updateOrderStatus = async (_, { id, newStatus }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const newOrderData = await order_1.default.findByIdAndUpdate(id, { status: newStatus }, { new: true });
        if (!newOrderData)
            throw new graphql_1.GraphQLError("Order not found!");
        await newOrderData.populate({ path: "orderItems", populate: { path: "product", populate: "category" } });
        await newOrderData.populate("customer");
        return newOrderData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.updateOrderStatus = updateOrderStatus;
const removeOrder = async (_, { id }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const removedOrderData = await order_1.default.findByIdAndDelete(id);
        if (!removedOrderData)
            throw new graphql_1.GraphQLError("Order not found!");
        await removedOrderData.populate({ path: "orderItems", populate: { path: "product", populate: "category" } });
        await removedOrderData.populate("customer");
        await removeRelatedOrderItems(removedOrderData.orderItems.map(item => item._id.toString()));
        return removedOrderData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.removeOrder = removeOrder;
const removeRelatedOrderItems = async (orderItemsIds) => {
    orderItemsIds.length && await orderItem_1.default.deleteMany({ _id: { $in: orderItemsIds } });
};
//# sourceMappingURL=order.js.map