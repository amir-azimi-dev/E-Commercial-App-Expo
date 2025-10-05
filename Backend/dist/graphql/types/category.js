"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTypeDef = void 0;
const CategoryTypeDef = `#graphql
    type Category {
        _id: ID!,
        title: String!,
        color: String!,
        icon: String!,
        image: String,
        createdAt: Date!,
        updatedAt: Date!
    }
`;
exports.CategoryTypeDef = CategoryTypeDef;
//# sourceMappingURL=category.js.map