type CreateCategoryParams = {
    title: string;
    color: string;
    icon: string;
    image?: string;
};

const CategoryTypeDef = `#graphql
    type Category {
        _id: ID!,
        title: String!,
        color: String!,
        icon: String!,
        image: String
    }
`;

export type { CreateCategoryParams };
export { CategoryTypeDef };