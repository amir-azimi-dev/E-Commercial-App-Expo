type RegisterUserParams = {
    name: string;
    email: string;
    password: string;
};

type LoginUserParams = {
    email: string;
    password: string;
};

const UserTypeDef = `#graphql
    type User {
        _id: ID!,
        name: String!,
        email: String!,
        createdAt: Date!,
        updatedAt: Date!
    }
`;

export type { RegisterUserParams, LoginUserParams };
export { UserTypeDef };