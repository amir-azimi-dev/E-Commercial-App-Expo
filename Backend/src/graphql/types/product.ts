type CreateProductParams = {
    title: string;
    image: string;
    countInStock: number;
    price: number;
};

const ProductTypeDef = `#graphql
    type Product {
        _id: ID!,
        title: String!,
        image: String!
        countInStock: Int!
        price: Int!
    }
`;

export type { CreateProductParams };
export { ProductTypeDef };