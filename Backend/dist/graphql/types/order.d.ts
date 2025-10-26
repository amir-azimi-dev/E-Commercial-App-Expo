type PlaceOrderParams = {
    orderItems: {
        product: string;
        quantity: number;
    }[];
    shippingAddress1: string;
    shippingAddress2?: string;
    phone: string;
    city: string;
    zip: string;
    country: string;
};
type UpdateOrderStatusParams = {
    id: string;
    newStatus: string;
};
declare const OrderTypeDef = "#graphql\n    type Order {\n        _id: ID!,\n        orderItems: [OrderItem!]!,\n        status: String!,\n        totalPrice: Float!,\n        customer: User!,\n        shippingAddress1: String!,\n        shippingAddress2: String,\n        phone: String!,\n        city: String!,\n        zip: String!,\n        country: String!,\n        createdAt: Date!,\n        updatedAt: Date!\n    }\n\n    type OrderItem {\n        _id: ID!,\n        product: Product!,\n        quantity: Int!,\n        createdAt: Date!,\n        updatedAt: Date!\n    }\n\n    input OrderItemInput {\n        product: ID!,\n        quantity: Int!\n    }\n";
export type { PlaceOrderParams, UpdateOrderStatusParams };
export { OrderTypeDef };
//# sourceMappingURL=order.d.ts.map