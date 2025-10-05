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
type GetProductsParams = {
    count?: number;
    categories?: string[];
    onlyFeaturedProducts?: boolean;
};
declare const ProductTypeDef = "#graphql\n    type Product {\n        _id: ID!,\n        title: String!,\n        description: String!,\n        richDescription: String,\n        image: String,\n        images: [String!],\n        brand: String,\n        price: Int!,\n        category: Category!,\n        countInStock: Int!,\n        rating: Int,\n        reviewsCount: Int,\n        isFeatured: Boolean,\n        createdAt: Date!,\n        updatedAt: Date!\n    }\n";
export type { CreateProductParams, GetProductsParams };
export { ProductTypeDef };
//# sourceMappingURL=product.d.ts.map