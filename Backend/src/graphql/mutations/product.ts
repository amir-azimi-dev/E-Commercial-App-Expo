import ProductModel, { ProductDocument } from "../../db/models/product";
import { CreateProductParams } from "../types/product";

const createProduct = async (_: unknown, { title, image, countInStock, price }: CreateProductParams): Promise<ProductDocument> => {
    const data = { title, image, countInStock, price };
    const newProductData = await ProductModel.create(data);

    return newProductData;
};

export {
    createProduct,
};