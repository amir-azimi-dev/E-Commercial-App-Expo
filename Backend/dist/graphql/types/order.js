"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTypeDef = void 0;
const OrderTypeDef = `#graphql
    type Order {
        _id: ID!,
        orderItems: [OrderItem!]!,
        status: String!,
        totalPrice: Float!,
        customer: User!,
        shippingAddress1: String!,
        shippingAddress2: String,
        phone: String!,
        city: String!,
        zip: String!,
        country: String!,
        createdAt: Date!,
        updatedAt: Date!
    }

    type OrderItem {
        _id: ID!,
        product: Product!,
        quantity: Int!,
        createdAt: Date!,
        updatedAt: Date!
    }

    input OrderItemInput {
        product: ID!,
        quantity: Int!
    }
`;
exports.OrderTypeDef = OrderTypeDef;
//# sourceMappingURL=order.js.map