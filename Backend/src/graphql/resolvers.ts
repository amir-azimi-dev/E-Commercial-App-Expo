import { sayHello } from "./queries/test";

const resolvers = {
    Query: {
        message: sayHello
    }
};

export default resolvers;