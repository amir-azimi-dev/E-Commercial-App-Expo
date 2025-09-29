import { UserTypeDef } from "./types/user";
import { ProductTypeDef } from "./types/product";
import { CategoryTypeDef } from "./types/category";
import { StatisticsTypeDef } from "./types/statistics";

const typeDefs = `#graphql
    scalar Date,

    ${UserTypeDef}
    ${ProductTypeDef}
    ${CategoryTypeDef}
    ${StatisticsTypeDef}

    type Query {
        getProducts(count: Int, categories: [String!], onlyFeaturedProducts: Boolean): [Product!]!,

        getCategories: [Category!]!,
        getCategory(id: String!): Category,

        getStatistics: Statistics!,
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!, phone: String!, street: String, apartment: String, city: String, zip: String, country: String): User,
        loginUser(identifier: String!, password: String!): User,

        createProduct(title: String!, description: String!, richDescription: String, image: String, images: [String!], brand: String, price: Int!, category: String!, countInStock: Int!, rating: Int, reviewsCount: Int, isFeatured: Boolean): Product,
        editProduct(id: String!, title: String!, description: String!, richDescription: String, image: String, images: [String!], brand: String, price: Int!, category: String!, countInStock: Int!, rating: Int, reviewsCount: Int, isFeatured: Boolean): Product,
        removeProduct(id: String!): Product,

        createCategory(title: String!, color: String!, icon: String!, image: String): Category,
        editCategory(id: String!, title: String!, color: String!, icon: String!, image: String): Category,
        removeCategory(id: String!): Category,
    }
`;

export default typeDefs;