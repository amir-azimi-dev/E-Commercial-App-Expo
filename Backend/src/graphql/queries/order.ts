import { GraphQLError } from "graphql";
import OrderModel, { OrderDocument } from "../../db/models/order";

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
export {
    getOrders,
};