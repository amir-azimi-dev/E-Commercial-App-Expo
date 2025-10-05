"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.editCategory = exports.createCategory = void 0;
const graphql_1 = require("graphql");
const category_1 = __importDefault(require("../../db/models/category"));
const mongoose_1 = __importDefault(require("mongoose"));
const createCategory = async (_, { title, color, icon, image }) => {
    try {
        const data = { title, color, icon, image };
        const newCategoryData = await category_1.default.create(data);
        return newCategoryData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.createCategory = createCategory;
const editCategory = async (_, { id, title, color, icon, image }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const data = { title, color, icon, image };
        const newCategoryData = await category_1.default.findByIdAndUpdate(id, data, { new: true });
        if (!newCategoryData)
            throw new graphql_1.GraphQLError("Category not found!");
        return newCategoryData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.editCategory = editCategory;
const removeCategory = async (_, { id }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const removedCategoryData = await category_1.default.findByIdAndDelete(id);
        if (!removedCategoryData)
            throw new graphql_1.GraphQLError("Category not found!");
        return removedCategoryData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.removeCategory = removeCategory;
//# sourceMappingURL=category.js.map