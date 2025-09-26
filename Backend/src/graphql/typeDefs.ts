import { UserTypeDef } from "./types/user";
import { ProductTypeDef } from "./types/product";
import { CategoryTypeDef } from "./types/category";

const typeDefs = `#graphql
    ${UserTypeDef}
    ${ProductTypeDef}
    ${CategoryTypeDef}

    type Query {
        getProducts: [Product!]!,

        getCategories: [Category!]!,
        getCategory(id: String!): Category,
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!): User,
        loginUser(email: String!, password: String!): User,

        createProduct(title: String!, image: String!, countInStock: Int!, price: Int!): Product,

        createCategory(title: String!, color: String!, icon: String!, image: String): Category,
        removeCategory(id: String!): Category,
    }
`;

export default typeDefs;