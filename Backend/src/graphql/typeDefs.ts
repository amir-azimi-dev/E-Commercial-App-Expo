import { UserTypeDef } from "./types/user";

const typeDefs = `#graphql
    ${UserTypeDef}

    type Query {
        message: String!,
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!): User,
    }
`;

export default typeDefs;