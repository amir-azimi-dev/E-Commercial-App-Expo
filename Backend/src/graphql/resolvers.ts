import { loginUser, registerUser } from "./mutations/user";
import { createProduct } from "./mutations/product";
import { getProducts } from "./queries/product";

const resolvers = {
    Query: {
        getProducts,
    },

    Mutation: {
        registerUser,
        loginUser,

        createProduct,
    }
};

export default resolvers;