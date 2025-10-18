import isAuthorizedMiddleware from "../middlewares/authorized";
import isAdminMiddleware from "../middlewares/admin";
import { loginUser, registerUser, removeUser } from "./mutations/user";
import { createProduct, editProduct, removeProduct } from "./mutations/product";
import { getProducts } from "./queries/product";
import { createCategory, editCategory, removeCategory } from "./mutations/category";
import { getCategories, getCategory } from "./queries/category";
import { getStatistics } from "./queries/statistics";
import { getMe, getUser, getUsers } from "./queries/user";
import { placeOrder, removeOrder, updateOrderStatus } from "./mutations/order";
import { getOrder, getOrders } from "./queries/order";

const resolvers = {
    Query: {
        getUsers: isAdminMiddleware(getUsers),
        getUser: isAdminMiddleware(getUser),
        getMe,

        getProducts,

        getCategories,
        getCategory,

        getOrders: isAdminMiddleware(getOrders),
        getOrder: isAdminMiddleware(getOrder),

        getStatistics: isAuthorizedMiddleware(getStatistics),
    },

    Mutation: {
        registerUser,
        loginUser,
        removeUser: isAdminMiddleware(removeUser),

        createProduct: isAdminMiddleware(createProduct),
        editProduct: isAdminMiddleware(editProduct),
        removeProduct: isAdminMiddleware(removeProduct),

        createCategory: isAdminMiddleware(createCategory),
        editCategory: isAdminMiddleware(editCategory),
        removeCategory: isAdminMiddleware(removeCategory),

        placeOrder: isAuthorizedMiddleware(placeOrder),
        updateOrderStatus: isAdminMiddleware(updateOrderStatus),
        removeOrder: isAdminMiddleware(removeOrder),
    }
};

export default resolvers;