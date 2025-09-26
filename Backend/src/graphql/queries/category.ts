import { GraphQLError } from "graphql";
import CategoryModel, { CategoryDocument } from "../../db/models/category";
import mongoose from "mongoose";

const getCategories = async (): Promise<CategoryDocument[]> => {
    try {
        return CategoryModel.find({});

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const getCategory = async (_: unknown, { id }: { id: string }): Promise<CategoryDocument> => {
    try {
        if (!mongoose.isValidObjectId(id)) throw new GraphQLError("Invalid entry!");

        const categoryData = await CategoryModel.findById(id);
        if (!categoryData) throw new GraphQLError("Category not found!");

        return categoryData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    getCategories,
    getCategory
};