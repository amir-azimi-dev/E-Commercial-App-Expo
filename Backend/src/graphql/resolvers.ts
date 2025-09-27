import { loginUser, registerUser } from "./mutations/user";
import { createProduct, editProduct, removeProduct } from "./mutations/product";
import { getProducts } from "./queries/product";
import { createCategory, editCategory, removeCategory } from "./mutations/category";
import { getCategories, getCategory } from "./queries/category";
import { getStatistics } from "./queries/statistics";

const resolvers = {
    Query: {
        getProducts,

        getCategories,
        getCategory,

        getStatistics,
    },

    Mutation: {
        registerUser,
        loginUser,

        createProduct,
        editProduct,
        removeProduct,

        createCategory,
        editCategory,
        removeCategory,
    }
};

export default resolvers;