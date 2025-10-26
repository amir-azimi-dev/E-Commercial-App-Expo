import { GraphQLError } from "graphql";
import OrderModel, { OrderDocument } from "../../db/models/order";
import ProductModel from "../../db/models/product";
import OrderItemModel from "../../db/models/orderItem";
import { PlaceOrderParams, UpdateOrderStatusParams } from "../types/order";
import mongoose from "mongoose";

const placeOrder = async (_: unknown, { orderItems, shippingAddress1, shippingAddress2, phone, city, zip, country }: PlaceOrderParams, context: any): Promise<OrderDocument> => {
    try {
        const hasInvalidOrderItemProductId = orderItems.some(item => (!mongoose.isValidObjectId(item.product) || item.quantity <= 0));
        if (hasInvalidOrderItemProductId) throw new GraphQLError("Invalid entry!");

        const manipulatedOrderItemsIds: string[] = [];
        let totalPrice = 0;

        for (const item of orderItems) {
            const targetProduct = await ProductModel.findById(item.product);
            if (!targetProduct) {
                throw new GraphQLError("Product not found!", {
                    extensions: { code: "PRODUCT_NOT_FOUND", status: 404 },
                });
            }

            const newOrderItem = await OrderItemModel.create(item);
            manipulatedOrderItemsIds.push(newOrderItem._id.toString());

            totalPrice += targetProduct.price * item.quantity;
        }

        const data = { orderItems: manipulatedOrderItemsIds, totalPrice, customer: context.user._id, shippingAddress1, shippingAddress2, phone, city, zip, country };
        const newOrderData = (await OrderModel.create(data));
        await newOrderData.populate({ path: "orderItems", populate: { path: "product", populate: "category" } });
        await newOrderData.populate("customer");

        return newOrderData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const updateOrderStatus = async (_: unknown, { id, newStatus }: UpdateOrderStatusParams): Promise<OrderDocument> => {
    try {
        if (!mongoose.isValidObjectId(id)) throw new GraphQLError("Invalid entry!");

        const newOrderData = await OrderModel.findByIdAndUpdate(id, { status: newStatus }, { new: true });
        if (!newOrderData) throw new GraphQLError("Order not found!");

        await newOrderData.populate({ path: "orderItems", populate: { path: "product", populate: "category" } });
        await newOrderData.populate("customer");

        return newOrderData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const removeOrder = async (_: unknown, { id }: { id: string }): Promise<OrderDocument> => {
    try {
        if (!mongoose.isValidObjectId(id)) throw new GraphQLError("Invalid entry!");

        const removedOrderData = await OrderModel.findByIdAndDelete(id);
        if (!removedOrderData) throw new GraphQLError("Order not found!");

        await removedOrderData.populate({ path: "orderItems", populate: { path: "product", populate: "category" } });
        await removedOrderData.populate("customer");

        await removeRelatedOrderItems(removedOrderData.orderItems.map(item => item._id.toString()));

        return removedOrderData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const removeRelatedOrderItems = async (orderItemsIds: string[]): Promise<void> => {
    orderItemsIds.length && await OrderItemModel.deleteMany({ _id: { $in: orderItemsIds } });
};

export {
    placeOrder,
    updateOrderStatus,
    removeOrder
};