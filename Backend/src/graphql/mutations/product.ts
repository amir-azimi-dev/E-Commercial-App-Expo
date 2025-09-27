import { GraphQLError } from "graphql";
import ProductModel, { ProductDocument } from "../../db/models/product";
import { CreateProductParams } from "../types/product";
import CategoryModel from "../../db/models/category";
import mongoose from "mongoose";

const createProduct = async (
    _: unknown,
    {
        title,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        reviewsCount,
        isFeatured
    }: CreateProductParams): Promise<ProductDocument> => {
    try {
        if (!mongoose.isValidObjectId(category)) throw new GraphQLError("Invalid category Id!");
        
        const targetCategory = await CategoryModel.findById(category);
        if (!targetCategory) throw new GraphQLError("Category not found!");

        const data = {
            title,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            reviewsCount,
            isFeatured
        };
        const newProductData = await ProductModel.create(data);

        return newProductData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    createProduct,
};