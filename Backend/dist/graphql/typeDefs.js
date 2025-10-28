"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./types/user");
const product_1 = require("./types/product");
const category_1 = require("./types/category");
const statistics_1 = require("./types/statistics");
const order_1 = require("./types/order");
const typeDefs = `#graphql
    scalar Date,

    ${user_1.UserTypeDef}
    ${user_1.AuthTypeDef}
    ${product_1.ProductTypeDef}
    ${category_1.CategoryTypeDef}
    ${statistics_1.StatisticsTypeDef}
    ${order_1.OrderTypeDef}

    type Query {
        getUsers: [User!]!,
        getUser(id: ID!): User,
        getMe: User,

        getProducts(count: Int, categories: [String!], onlyFeaturedProducts: Boolean): [Product!]!,
        getProduct(id: ID!): Product,

        getCategories: [Category!]!,
        getCategory(id: ID!): Category,

        getStatistics: Statistics!,

        getOrders: [Order!]!,
        getOrder(id: ID!): Order,
        getUserOrders: [Order!]!,
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!, phone: String!, street: String, apartment: String, city: String, zip: String, country: String): Auth,
        loginUser(identifier: String!, password: String!): Auth,
        removeUser(id: ID!): User,

        createProduct(title: String!, description: String!, richDescription: String, image: String, images: [String!], brand: String, price: Float!, category: ID!, countInStock: Int!, rating: Int, reviewsCount: Int, isFeatured: Boolean): Product,
        editProduct(id: ID!, title: String!, description: String!, richDescription: String, image: String, images: [String!], brand: String, price: Float!, category: ID!, countInStock: Int!, rating: Int, reviewsCount: Int, isFeatured: Boolean): Product,
        removeProduct(id: ID!): Product,

        createCategory(title: String!, color: String!, icon: String, image: String): Category,
        editCategory(id: ID!, title: String!, color: String!, icon: String, image: String): Category,
        removeCategory(id: ID!): Category,

        placeOrder(orderItems: [OrderItemInput!]!, shippingAddress1: String!, shippingAddress2: String, phone: String!, city: String!, zip: String!, country: String!): Order,
        updateOrderStatus(id: ID!, newStatus: String): Order,
        removeOrder(id: ID!): Order,
    }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map