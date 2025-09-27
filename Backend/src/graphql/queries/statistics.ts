import { GraphQLError } from "graphql";
import { Statistics } from "../types/statistics";
import ProductModel from "../../db/models/product";
import UserModel from "../../db/models/user";
import CategoryModel from "../../db/models/category";

const getStatistics = async (): Promise<Statistics> => {
    try {
        const productsCount = await ProductModel.countDocuments({});
        const usersCount = await UserModel.countDocuments({});
        const categoriesCount = await CategoryModel.countDocuments({});

        return { productsCount, usersCount, categoriesCount };

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export { getStatistics };