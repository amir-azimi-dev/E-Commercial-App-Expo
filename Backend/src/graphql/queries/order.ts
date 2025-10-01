import { GraphQLError } from "graphql";
import OrderModel, { OrderDocument } from "../../db/models/order";
import mongoose from "mongoose";

const getOrders = async (): Promise<OrderDocument[]> => {
    try {
        const ordersData = await OrderModel.find({})
            .populate({ path: "orderItems", populate: { path: "product", populate: "category" } })
            .populate("customer");

        return ordersData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const getOrder = async (_: unknown, { id }: { id: string }): Promise<OrderDocument> => {
    try {
        if (!mongoose.isValidObjectId(id)) throw new GraphQLError("Invalid entry!");

        const orderData = await OrderModel.findById(id)
            .populate({ path: "orderItems", populate: { path: "product", populate: "category" } })
            .populate("customer");

        if (!orderData) throw new GraphQLError("Order not found!");

        return orderData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    getOrders,
    getOrder
};