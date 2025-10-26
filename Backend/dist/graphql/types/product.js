"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeDef = void 0;
const ProductTypeDef = `#graphql
    type Product {
        _id: ID!,
        title: String!,
        description: String!,
        richDescription: String,
        image: String,
        images: [String!],
        brand: String,
        price: Float!,
        category: Category!,
        countInStock: Int!,
        rating: Int,
        reviewsCount: Int,
        isFeatured: Boolean,
        createdAt: Date!,
        updatedAt: Date!
    }
`;
exports.ProductTypeDef = ProductTypeDef;
//# sourceMappingURL=product.js.map