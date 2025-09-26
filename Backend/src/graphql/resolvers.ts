import { loginUser, registerUser } from "./mutations/user";
import { createProduct } from "./mutations/product";
import { getProducts } from "./queries/product";
import { createCategory, removeCategory } from "./mutations/category";

const resolvers = {
    Query: {
        getProducts,
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