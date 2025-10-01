type PlaceOrderParams = {
    orderItems: { product: string, quantity: number }[];
    shoppingAddress1: string;
    shoppingAddress2?: string;
    phone: string;
    city: string;
    zip: string;
    country: string;
};

type UpdateOrderStatusParams = {
    id: string;
    newStatus: string;
};

const OrderTypeDef = `#graphql
    type Order {
        _id: ID!,
        orderItems: [OrderItem!]!,
        status: String!,
        totalPrice: Float!,
        customer: User!,
        shoppingAddress1: String!,
        shoppingAddress2: String,
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

export type { PlaceOrderParams, UpdateOrderStatusParams };
export { OrderTypeDef };