"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = void 0;
const graphql_1 = require("graphql");
const product_1 = __importDefault(require("../../db/models/product"));
const user_1 = __importDefault(require("../../db/models/user"));
const category_1 = __importDefault(require("../../db/models/category"));
const order_1 = __importDefault(require("../../db/models/order"));
const getStatistics = async () => {
    try {
        const productsCount = await product_1.default.countDocuments({});
        const usersCount = await user_1.default.countDocuments({});
        const categoriesCount = await category_1.default.countDocuments({});
        const ordersCount = await order_1.default.countDocuments({});
        const totalSales = await order_1.default.aggregate([
            { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }
        ]);
        return { productsCount, usersCount, categoriesCount, ordersCount, totalSales: totalSales[0]?.totalSales ?? 0 };
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.getStatistics = getStatistics;
//# sourceMappingURL=statistics.js.map