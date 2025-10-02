import { GraphQLError } from "graphql";
import { Statistics } from "../types/statistics";
import ProductModel from "../../db/models/product";
import UserModel from "../../db/models/user";
import CategoryModel from "../../db/models/category";
import OrderModel from "../../db/models/order";

const getStatistics = async (): Promise<Statistics> => {
    try {
        const productsCount = await ProductModel.countDocuments({});
        const usersCount = await UserModel.countDocuments({});
        const categoriesCount = await CategoryModel.countDocuments({});
        const ordersCount = await OrderModel.countDocuments({});

        const totalSales = await OrderModel.aggregate([
            { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }
        ]);

        return { productsCount, usersCount, categoriesCount, ordersCount, totalSales: totalSales[0]?.totalSales ?? 0 };

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export { getStatistics };