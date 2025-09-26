import { loginUser, registerUser } from "./mutations/user";
import { createProduct } from "./mutations/product";
import { getProducts } from "./queries/product";
import { createCategory, removeCategory } from "./mutations/category";
import { getCategories, getCategory } from "./queries/category";

const resolvers = {
    Query: {
        getProducts,

        getCategories,
        getCategory,
    },

    Mutation: {
        registerUser,
        loginUser,

        createProduct,

        createCategory,
        removeCategory
    }
};

export default resolvers;