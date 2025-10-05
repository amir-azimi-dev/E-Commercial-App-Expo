"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.getOrders = void 0;
const graphql_1 = require("graphql");
const order_1 = __importDefault(require("../../db/models/order"));
const mongoose_1 = __importDefault(require("mongoose"));
const getOrders = async () => {
    try {
        const ordersData = await order_1.default.find({})
            .populate({ path: "orderItems", populate: { path: "product", populate: "category" } })
            .populate("customer");
        return ordersData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.getOrders = getOrders;
const getOrder = async (_, { id }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const orderData = await order_1.default.findById(id)
            .populate({ path: "orderItems", populate: { path: "product", populate: "category" } })
            .populate("customer");
        if (!orderData)
            throw new graphql_1.GraphQLError("Order not found!");
        return orderData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.getOrder = getOrder;
//# sourceMappingURL=order.js.map