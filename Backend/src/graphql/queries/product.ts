import { GraphQLError } from "graphql";
import ProductModel, { ProductDocument } from "../../db/models/product";
import { GetProductsParams } from "../types/product";
import mongoose from "mongoose";

const getProducts = async (_: unknown, { count, categories, onlyFeaturedProducts }: GetProductsParams): Promise<ProductDocument[]> => {
    try {
        const hasIncorrectObjectId = (categories || []).some(id => !mongoose.isValidObjectId(id));
        if (hasIncorrectObjectId) throw new GraphQLError("Invalid category Id!")

        let projection: Record<string, any> = {};

        if (onlyFeaturedProducts) {
            projection = { isFeatured: true };
        }

        if (categories?.length) {
            projection = { ...projection, category: { $in: categories } };
        }

        return ProductModel.find(projection).populate("category").limit(count ?? 0);

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    getProducts
};