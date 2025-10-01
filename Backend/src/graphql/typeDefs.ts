import { AuthTypeDef, UserTypeDef } from "./types/user";
import { ProductTypeDef } from "./types/product";
import { CategoryTypeDef } from "./types/category";
import { StatisticsTypeDef } from "./types/statistics";
import { OrderTypeDef } from "./types/order";

const typeDefs = `#graphql
    scalar Date,

    ${UserTypeDef}
    ${AuthTypeDef}
    ${ProductTypeDef}
    ${CategoryTypeDef}
    ${StatisticsTypeDef}
    ${OrderTypeDef}

    type Query {
        getUsers: [User!]!,
        getUser(id: ID!): User,

        getProducts(count: Int, categories: [String!], onlyFeaturedProducts: Boolean): [Product!]!,

        getCategories: [Category!]!,
        getCategory(id: ID!): Category,

        getStatistics: Statistics!,

        getOrders: [Order!]!,
        getOrder(id: ID!): Order,
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!, phone: String!, street: String, apartment: String, city: String, zip: String, country: String): Auth,
        loginUser(identifier: String!, password: String!): Auth,
        removeUser(id: ID!): User,

        createProduct(title: String!, description: String!, richDescription: String, image: String, images: [String!], brand: String, price: Int!, category: String!, countInStock: Int!, rating: Int, reviewsCount: Int, isFeatured: Boolean): Product,
        editProduct(id: ID!, title: String!, description: String!, richDescription: String, image: String, images: [String!], brand: String, price: Int!, category: String!, countInStock: Int!, rating: Int, reviewsCount: Int, isFeatured: Boolean): Product,
        removeProduct(id: ID!): Product,

        createCategory(title: String!, color: String!, icon: String!, image: String): Category,
        editCategory(id: ID!, title: String!, color: String!, icon: String!, image: String): Category,
        removeCategory(id: ID!): Category,

        placeOrder(orderItems: [OrderItemInput!]!, shoppingAddress1: String!, shoppingAddress2: String, phone: String!, city: String!, zip: String!, country: String!): Order,
    }
`;

export default typeDefs;