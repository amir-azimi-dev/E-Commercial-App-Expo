import ProductModel, { ProductDocument } from "../../db/models/product";

const getProducts = async (): Promise<ProductDocument[]> => await ProductModel.find({});

export {
    getProducts
};