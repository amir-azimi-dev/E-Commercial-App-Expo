type CreateProductParams = {
    title: string;
    description: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    price: number;
    category: string;
    countInStock: number;
    rating?: number;
    reviewsCount?: number;
    isFeatured?: boolean;
};

const ProductTypeDef = `#graphql
    type Product {
        _id: ID!,
        title: String!,
        description: String!,
        richDescription: String,
        image: String,
        images: [String!],
        brand: String,
        price: Int!,
        category: Category!,
        countInStock: Int!,
        rating: Int,
        reviewsCount: Int,
        isFeatured: Boolean
    }
`;

export type { CreateProductParams };
export { ProductTypeDef };