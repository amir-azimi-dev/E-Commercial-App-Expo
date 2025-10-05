"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.getCategories = void 0;
const graphql_1 = require("graphql");
const category_1 = __importDefault(require("../../db/models/category"));
const mongoose_1 = __importDefault(require("mongoose"));
const getCategories = async () => {
    try {
        return category_1.default.find({});
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.getCategories = getCategories;
const getCategory = async (_, { id }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const categoryData = await category_1.default.findById(id);
        if (!categoryData)
            throw new graphql_1.GraphQLError("Category not found!");
        return categoryData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.getCategory = getCategory;
//# sourceMappingURL=category.js.map