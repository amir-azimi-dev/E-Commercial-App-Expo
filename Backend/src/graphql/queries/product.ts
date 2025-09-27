import { GraphQLError } from "graphql";
import ProductModel, { ProductDocument } from "../../db/models/product";

const getProducts = async (): Promise<ProductDocument[]> => {
    try {
        return ProductModel.find({}).populate("category");

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    getProducts
};