"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = void 0;
const graphql_1 = require("graphql");
const product_1 = __importDefault(require("../../db/models/product"));
const mongoose_1 = __importDefault(require("mongoose"));
const getProducts = async (_, { count, categories, onlyFeaturedProducts }) => {
    try {
        const hasIncorrectObjectId = (categories || []).some(id => !mongoose_1.default.isValidObjectId(id));
        if (hasIncorrectObjectId)
            throw new graphql_1.GraphQLError("Invalid category Id!");
        let projection = {};
        if (onlyFeaturedProducts) {
            projection = { isFeatured: true };
        }
        if (categories?.length) {
            projection = { ...projection, category: { $in: categories } };
        }
        return product_1.default.find(projection).populate("category").limit(count ?? 0);
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.getProducts = getProducts;
const getProduct = async (_, { id }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const productData = await product_1.default.findById(id).populate("category");
        if (!productData)
            throw new graphql_1.GraphQLError("Product not found!");
        return productData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.getProduct = getProduct;
//# sourceMappingURL=product.js.map