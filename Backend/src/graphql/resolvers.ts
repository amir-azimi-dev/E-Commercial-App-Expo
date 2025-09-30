import isAuthorizedMiddleware from "../middlewares/authorized";
import isAdminMiddleware from "../middlewares/admin";
import { loginUser, registerUser } from "./mutations/user";
import { createProduct, editProduct, removeProduct } from "./mutations/product";
import { getProducts } from "./queries/product";
import { createCategory, editCategory, removeCategory } from "./mutations/category";
import { getCategories, getCategory } from "./queries/category";
import { getStatistics } from "./queries/statistics";
import { getUser, getUsers } from "./queries/user";

const resolvers = {
    Query: {
        getUsers: isAdminMiddleware(getUsers),
        getUser: isAdminMiddleware(getUser),
        
        getProducts,

        getCategories,
        getCategory,

        getStatistics: isAuthorizedMiddleware(getStatistics),
    },

    Mutation: {
        registerUser,
        loginUser,

        createProduct: isAdminMiddleware(createProduct),
        editProduct: isAdminMiddleware(editProduct),
        removeProduct: isAdminMiddleware(removeProduct),

        createCategory: isAdminMiddleware(createCategory),
        editCategory: isAdminMiddleware(editCategory),
        removeCategory: isAdminMiddleware(removeCategory),
    }
};

export default resolvers;