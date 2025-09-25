import { UserTypeDef } from "./types/user";
import { ProductTypeDef } from "./types/product";

const typeDefs = `#graphql
    ${UserTypeDef}
    ${ProductTypeDef}

    type Query {
        getProducts: [Product!]!,
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!): User,
        loginUser(email: String!, password: String!): User,

        createProduct(title: String!, image: String!, countInStock: Int!, price: Int!): Product
    }
`;

export default typeDefs;