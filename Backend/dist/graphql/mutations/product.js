"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProduct = exports.editProduct = exports.createProduct = void 0;
const graphql_1 = require("graphql");
const product_1 = __importDefault(require("../../db/models/product"));
const category_1 = __importDefault(require("../../db/models/category"));
const mongoose_1 = __importDefault(require("mongoose"));
const file_1 = require("../../utils/file");
const createProduct = async (_, { title, description, richDescription, image, images, brand, price, category, countInStock, rating, reviewsCount, isFeatured }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(category))
            throw new graphql_1.GraphQLError("Invalid category Id!");
        const targetCategory = await category_1.default.findById(category);
        if (!targetCategory)
            throw new graphql_1.GraphQLError("Category not found!");
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
        const newProductData = (await product_1.default.create(data));
        await newProductData.populate("category");
        return newProductData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.createProduct = createProduct;
const editProduct = async (_, { id, title, description, richDescription, image, images, brand, price, category, countInStock, rating, reviewsCount, isFeatured }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid product Id!");
        if (!mongoose_1.default.isValidObjectId(category))
            throw new graphql_1.GraphQLError("Invalid category Id!");
        const targetCategory = await category_1.default.findById(category);
        if (!targetCategory)
            throw new graphql_1.GraphQLError("Category not found!");
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
        !image && Reflect.deleteProperty(data, "image");
        !images?.length && Reflect.deleteProperty(data, "images");
        const oldProductData = await product_1.default.findById(id, { image: 1, images: 1 });
        const newProductData = await product_1.default.findByIdAndUpdate(id, data, { new: true }).populate("category");
        if (!oldProductData || !newProductData)
            throw new graphql_1.GraphQLError("Product not found!");
        if (image && oldProductData.image) {
            console.log(oldProductData.image);
            await (0, file_1.removeFile)(oldProductData.image);
        }
        if (images?.length && oldProductData.images.length) {
            console.log(images);
            await Promise.all(oldProductData.images.map(file_1.removeFile));
        }
        return newProductData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.editProduct = editProduct;
const removeProduct = async (_, { id }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const removedProduct = await product_1.default.findByIdAndDelete(id).populate("category");
        if (!removedProduct)
            throw new graphql_1.GraphQLError("Product not found!");
        if (removedProduct.image) {
            await (0, file_1.removeFile)(removedProduct.image);
        }
        if (removedProduct.images.length) {
            await Promise.all(removedProduct.images.map(file_1.removeFile));
        }
        return removedProduct;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.removeProduct = removeProduct;
//# sourceMappingURL=product.js.map