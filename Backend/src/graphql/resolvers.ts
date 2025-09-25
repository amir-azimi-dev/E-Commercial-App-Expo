import { loginUser, registerUser } from "./mutations/user";
import { sayHello } from "./queries/test";

const resolvers = {
    Query: {
        message: sayHello
    },

    Mutation: {
        registerUser,
        loginUser
    }
};

export default resolvers;