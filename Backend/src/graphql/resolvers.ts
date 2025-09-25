import { sayHello } from "./queries/test";
import { loginUser, registerUser } from "./mutations/user";
import { createProduct } from "./mutations/product";

const resolvers = {
    Query: {
        message: sayHello
    },

    Mutation: {
        registerUser,
        loginUser,

        createProduct,
    }
};

export default resolvers;