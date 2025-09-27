type Statistics = {
    productsCount: number;
    usersCount: number;
    categoriesCount: number;
};

const StatisticsTypeDef = `#graphql
    type Statistics {
        productsCount: Int!,
        usersCount: Int!,
        categoriesCount: Int!
    }
`;

export type { Statistics };
export { StatisticsTypeDef };