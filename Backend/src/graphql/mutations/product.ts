import { GraphQLError } from "graphql";
import ProductModel, { ProductDocument } from "../../db/models/product";
import CategoryModel from "../../db/models/category";
import { CreateProductParams } from "../types/product";
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
        const newProductData = (await ProductModel.create(data));
        await newProductData.populate("category");

        return newProductData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const editProduct = async (
    _: unknown,
    {
        id,
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
    }: CreateProductParams & { id: string }): Promise<ProductDocument> => {
    try {
        if (!mongoose.isValidObjectId(id)) throw new GraphQLError("Invalid product Id!");
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
        const newProductData = await ProductModel.findByIdAndUpdate(id, data, { new: true }).populate("category");
        if (!newProductData) throw new GraphQLError("Product not found!");

        return newProductData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const removeProduct = async (_: unknown, { id }: { id: string }): Promise<ProductDocument> => {
    try {
        if (!mongoose.isValidObjectId(id)) throw new GraphQLError("Invalid entry!");

        const removedProduct = await ProductModel.findByIdAndDelete(id).populate("category");
        if (!removedProduct) throw new GraphQLError("Product not found!");

        return removedProduct;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};


export {
    createProduct,
    editProduct,
    removeProduct
};