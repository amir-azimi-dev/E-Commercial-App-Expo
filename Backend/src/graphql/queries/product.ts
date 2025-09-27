import { GraphQLError } from "graphql";
import ProductModel, { ProductDocument } from "../../db/models/product";
import { GetProductsParams } from "../types/product";

const getProducts = async (_: unknown, { count, onlyFeaturedProducts }: GetProductsParams): Promise<ProductDocument[]> => {
    try {
        const projection = onlyFeaturedProducts ? { isFeatured: true } : {};
        return ProductModel.find(projection).populate("category").limit(count ?? 0);

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    getProducts
};