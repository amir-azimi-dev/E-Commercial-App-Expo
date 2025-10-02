type Statistics = {
    productsCount: number;
    usersCount: number;
    categoriesCount: number;
    ordersCount: number;
    totalSales: number;
};

const StatisticsTypeDef = `#graphql
    type Statistics {
        productsCount: Int!,
        usersCount: Int!,
        categoriesCount: Int!,
        ordersCount: Int!,
        totalSales: Float!
    }
`;

export type { Statistics };
export { StatisticsTypeDef };