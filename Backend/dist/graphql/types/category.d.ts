type CreateCategoryParams = {
    title: string;
    color: string;
    icon: string;
    image?: string;
};
declare const CategoryTypeDef = "#graphql\n    type Category {\n        _id: ID!,\n        title: String!,\n        color: String!,\n        icon: String!,\n        image: String,\n        createdAt: Date!,\n        updatedAt: Date!\n    }\n";
export type { CreateCategoryParams };
export { CategoryTypeDef };
//# sourceMappingURL=category.d.ts.map