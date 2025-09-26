import { GraphQLError } from "graphql";
import CategoryModel, { CategoryDocument } from "../../db/models/category";
import { CreateCategoryParams } from "../types/category";
import mongoose from "mongoose";

const createCategory = async (_: unknown, { title, color, icon, image }: CreateCategoryParams): Promise<CategoryDocument> => {
    try {
        const data = { title, color, icon, image };
        const newCategoryData = await CategoryModel.create(data);

        return newCategoryData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const editCategory = async (_: unknown, { id, title, color, icon, image }: CreateCategoryParams & { id: string }): Promise<CategoryDocument> => {
    try {
        if (!mongoose.isValidObjectId(id)) throw new GraphQLError("Invalid entry!");

        const data = { title, color, icon, image };
        const newCategoryData = await CategoryModel.findByIdAndUpdate(id, data, { new: true });
        if (!newCategoryData) throw new GraphQLError("Category not found!");

        return newCategoryData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const removeCategory = async (_: unknown, { id }: { id: string }): Promise<CategoryDocument> => {
    try {
        if (!mongoose.isValidObjectId(id)) throw new GraphQLError("Invalid entry!");

        const removedCategoryData = await CategoryModel.findByIdAndDelete(id);
        if (!removedCategoryData) throw new GraphQLError("Category not found!");

        return removedCategoryData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    createCategory,
    editCategory,
    removeCategory
};