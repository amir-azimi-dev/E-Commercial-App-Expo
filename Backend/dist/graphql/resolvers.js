"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authorized_1 = __importDefault(require("../middlewares/authorized"));
const admin_1 = __importDefault(require("../middlewares/admin"));
const user_1 = require("./mutations/user");
const product_1 = require("./mutations/product");
const product_2 = require("./queries/product");
const category_1 = require("./mutations/category");
const category_2 = require("./queries/category");
const statistics_1 = require("./queries/statistics");
const user_2 = require("./queries/user");
const order_1 = require("./mutations/order");
const order_2 = require("./queries/order");
const resolvers = {
    Query: {
        getUsers: (0, admin_1.default)(user_2.getUsers),
        getUser: (0, admin_1.default)(user_2.getUser),
        getProducts: product_2.getProducts,
        getCategories: category_2.getCategories,
        getCategory: category_2.getCategory,
        getOrders: (0, admin_1.default)(order_2.getOrders),
        getOrder: (0, admin_1.default)(order_2.getOrder),
        getStatistics: (0, authorized_1.default)(statistics_1.getStatistics),
    },
    Mutation: {
        registerUser: user_1.registerUser,
        loginUser: user_1.loginUser,
        removeUser: (0, admin_1.default)(user_1.removeUser),
        createProduct: (0, admin_1.default)(product_1.createProduct),
        editProduct: (0, admin_1.default)(product_1.editProduct),
        removeProduct: (0, admin_1.default)(product_1.removeProduct),
        createCategory: (0, admin_1.default)(category_1.createCategory),
        editCategory: (0, admin_1.default)(category_1.editCategory),
        removeCategory: (0, admin_1.default)(category_1.removeCategory),
        placeOrder: (0, authorized_1.default)(order_1.placeOrder),
        updateOrderStatus: (0, admin_1.default)(order_1.updateOrderStatus),
        removeOrder: (0, admin_1.default)(order_1.removeOrder),
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map