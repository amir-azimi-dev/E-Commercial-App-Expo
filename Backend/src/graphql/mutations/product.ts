import { GraphQLError } from "graphql";
import ProductModel, { ProductDocument } from "../../db/models/product";
import { CreateProductParams } from "../types/product";

const createProduct = async (_: unknown, { title, image, countInStock, price }: CreateProductParams): Promise<ProductDocument> => {
    try {
        const data = { title, image, countInStock, price };
        const newProductData = await ProductModel.create(data);

        return newProductData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    createProduct,
};